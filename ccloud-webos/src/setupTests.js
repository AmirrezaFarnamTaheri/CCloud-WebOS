import '@testing-library/jest-dom';

// jsdom doesn't implement media playback; Enact's VideoPlayer + our StreamPlayer
// call these APIs and would otherwise spam the test output.
const HTMLMediaElementCtor =
	typeof globalThis !== 'undefined' ? globalThis.HTMLMediaElement : undefined;

if (HTMLMediaElementCtor) {
	Object.defineProperty(HTMLMediaElementCtor.prototype, 'pause', {
		configurable: true,
		value: jest.fn()
	});
	Object.defineProperty(HTMLMediaElementCtor.prototype, 'load', {
		configurable: true,
		value: jest.fn()
	});
	Object.defineProperty(HTMLMediaElementCtor.prototype, 'play', {
		configurable: true,
		value: jest.fn().mockResolvedValue(undefined)
	});
}
