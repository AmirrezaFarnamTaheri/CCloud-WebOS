import { useEffect, useRef } from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Hls from 'hls.js';

const StreamPlayer = ({ src, onBack, autoPlay, ...rest }) => {
	const playerRef = useRef(null);

	useEffect(() => {
		const player = playerRef.current;
		// Enact VideoPlayer exposes the underlying video tag via getVideoNode()
		const video = player && typeof player.getVideoNode === 'function' ? player.getVideoNode() : null;
		let hls;

		const isHls = typeof src === 'string' && (src.includes('.m3u8') || src.includes('.m3u'));
		if (!video || !src) return;

        // Reset any previous source before attaching a new one
		video.pause?.();
		video.removeAttribute('src');

		if (isHls && Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				if (autoPlay) {
					video.play().catch((e) => console.log('Autoplay prevented', e));
				}
			});
		} else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
			if (autoPlay) {
				video.play().catch(() => {});
			}
		} else if (!isHls) {
            video.src = src;
            if (autoPlay) {
                video.play().catch(() => {});
            }
        } else {
            console.warn('HLS playback not supported for this URL on this device');
        }

		return () => {
			if (hls) {
                try {
                    hls.detachMedia();
                } finally {
                    hls.destroy();
                }
            }
            if (video) {
                video.pause?.();
                video.removeAttribute('src');
                video.load?.();
            }
		};
	}, [src, autoPlay]);

	return (
		<VideoPlayer
			{...rest}
			onBack={onBack}
			ref={playerRef}
			autoPlay={autoPlay}
		>
			{/* Fallback source for native compatibility in some browsers */}
			{src && !(src.includes('.m3u8') || src.includes('.m3u')) && <source src={src} />}
		</VideoPlayer>
	);
};

export default StreamPlayer;
