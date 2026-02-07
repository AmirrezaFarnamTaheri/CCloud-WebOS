import { useEffect, useRef, useState, useCallback } from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Spinner from '@enact/sandstone/Spinner';
import Hls from 'hls.js';

const StreamPlayer = ({ src, onBack, autoPlay, ...rest }) => {
	const playerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handlers need to be defined outside useEffect or memoized to be stable
    const handleReady = useCallback(() => {
        setLoading(false);
        const player = playerRef.current;
        const video = player && typeof player.getVideoNode === 'function' ? player.getVideoNode() : null;
        if (autoPlay && video) {
            video.play().catch((e) => console.log('Autoplay prevented', e));
        }
    }, [autoPlay]);

    const handleError = useCallback((e) => {
        console.error('Video Error:', e);
        setLoading(false);
        setError('Playback Error: Please try again later.');
    }, []);

	useEffect(() => {
		const player = playerRef.current;
		const video = player && typeof player.getVideoNode === 'function' ? player.getVideoNode() : null;
		let hls;

        setLoading(true);
        setError(null);

		const isHls = typeof src === 'string' && (src.includes('.m3u8') || src.includes('.m3u'));
		if (!video || !src) {
            setLoading(false);
            return;
        }

        // Cleanup previous state
		video.pause?.();
		video.removeAttribute('src');

		if (isHls && Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, handleReady);
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                   handleError(data);
                }
            });
		} else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src;
            video.addEventListener('loadedmetadata', handleReady);
            video.addEventListener('error', handleError);
		} else if (!isHls) {
            video.src = src;
            video.addEventListener('loadedmetadata', handleReady);
            video.addEventListener('error', handleError);
        } else {
            console.warn('HLS playback not supported for this URL on this device');
            setError('Format Not Supported');
            setLoading(false);
        }

		return () => {
            if (video) {
                video.removeEventListener('loadedmetadata', handleReady);
                video.removeEventListener('error', handleError);
            }
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
	}, [src, autoPlay, handleReady, handleError]);

	return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10, backgroundColor: 'black'
                }}>
                    <Spinner transparent aria-label="Loading content">Loading...</Spinner>
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10, backgroundColor: '#1a1a1a', color: 'red'
                }}>
                    {error}
                </div>
            )}
            <VideoPlayer
                {...rest}
                onBack={onBack}
                ref={playerRef}
                autoPlay={autoPlay}
                poster={null}
                aria-label="Video Player"
            >
                {/* Fallback source for native compatibility in some browsers */}
                {src && !(src.includes('.m3u8') || src.includes('.m3u')) && <source src={src} />}
            </VideoPlayer>
        </div>
	);
};

export default StreamPlayer;
