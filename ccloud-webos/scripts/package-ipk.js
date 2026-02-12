#!/usr/bin/env node
/* eslint-disable no-console */

// Packages `dist/` into an .ipk using @webos-tools/cli.
//
// On WSL, running `ares-package dist` from a Windows-mounted path (e.g. /mnt/d)
// can be extremely slow because the packager copies thousands of ilib locale
// files. Copying `dist/` to the OS temp dir first keeps the hot path on the
// Linux filesystem and speeds packaging up significantly.

const nodeCrypto = require('crypto');
const {spawn} = require('child_process');
const fsSync = require('fs');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');

async function pathExists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

function run(cmd, args, opts) {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, {
			stdio: 'inherit',
			...opts
		});

		child.on('error', reject);
		child.on('exit', (code, signal) => {
			if (signal) {
				return reject(new Error(`Command terminated by signal ${signal}: ${cmd}`));
			}
			if (code !== 0) {
				return reject(new Error(`Command failed (${code}): ${cmd} ${args.join(' ')}`));
			}
			resolve();
		});
	});
}

async function pickTempRootDir() {
	const candidates = [];

	// Prefer TMPDIR if the user explicitly set it.
	if (process.env.TMPDIR) candidates.push(process.env.TMPDIR);

	// On WSL, os.tmpdir() can resolve to a Windows-mounted path (e.g. /mnt/c/...),
	// which is slow for lots of small files. Prefer the Linux temp dir first.
	if (process.platform !== 'win32') candidates.push('/tmp');

	// Fall back to Node's default.
	candidates.push(os.tmpdir());

	for (const dir of candidates) {
		if (!dir) continue;
		try {
			const stat = await fs.stat(dir);
			if (!stat.isDirectory()) continue;
			await fs.access(dir, fsSync.constants.W_OK);
			return dir;
		} catch {
			// keep trying
		}
	}

	return os.tmpdir();
}

async function main() {
	const projectRoot = process.cwd();
	const distDir = path.join(projectRoot, 'dist');
	const outDir = projectRoot;
	const aresPackageJs = path.join(projectRoot, 'node_modules', '@webos-tools', 'cli', 'bin', 'ares-package.js');

	if (!(await pathExists(distDir))) {
		throw new Error(`Missing ${distDir}. Run "npm run pack-p" first.`);
	}
	if (!(await pathExists(aresPackageJs))) {
		throw new Error(`Missing ${aresPackageJs}. Run "npm install" first.`);
	}

	const tempRoot = await pickTempRootDir();
	const tempBase = path.join(
		tempRoot,
		`ccloud-webos-ipk-${process.pid}-${Date.now()}-${nodeCrypto.randomBytes(4).toString('hex')}`
	);
	const tempAppDir = path.join(tempBase, 'dist');

	try {
		await fs.mkdir(tempBase, {recursive: true});

		console.log(`Copying dist -> ${tempAppDir}`);
		await fs.cp(distDir, tempAppDir, {recursive: true});

		console.log('Packaging .ipk...');
		await run(process.execPath, [aresPackageJs, '--no-minify', '--outdir', outDir, tempAppDir], {
			cwd: projectRoot,
			env: {...process.env, TMPDIR: tempRoot}
		});
	} finally {
		await fs.rm(tempBase, {recursive: true, force: true});
	}
}

main().catch((err) => {
	console.error(err && err.stack ? err.stack : String(err));
	process.exit(1);
});
