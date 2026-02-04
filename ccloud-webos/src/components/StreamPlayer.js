import { useEffect } from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Hls from 'hls.js';

const StreamPlayer = ({ src, onBack, ...rest }) => {
	useEffect(() => {
		const video = document.querySelector('video');
		let hls;

		if (video && Hls.isSupported() && src && (src.includes('.m3u8') || src.includes('.m3u'))) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.play().catch(e => console.log('Autoplay prevented', e));
			});
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [src]);

	return (
		<VideoPlayer
			{...rest}
			onBack={onBack}
		>
			{!src.includes('.m3u8') && <source src={src} />}
		</VideoPlayer>
	);
};

export default StreamPlayer;
