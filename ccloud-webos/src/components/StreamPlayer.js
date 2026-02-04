import React, { useEffect } from 'react';
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
        } else if (video) {
            // Fallback or native
             // VideoPlayer might handle src prop, but if we want to force it:
             // video.src = src;
             // But Enact VideoPlayer usually takes 'children' as source tags or 'source' prop?
             // Actually standard usage is <VideoPlayer><source src=... /></VideoPlayer>
             // But since we are intercepting for HLS, we manually load.
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
