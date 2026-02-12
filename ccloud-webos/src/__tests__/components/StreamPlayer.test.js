import { render, screen } from '@testing-library/react';
import StreamPlayer from '../../components/StreamPlayer';
import Hls from 'hls.js';

// Mock Enact components
jest.mock('@enact/sandstone/VideoPlayer', () => {
    const { forwardRef, useImperativeHandle, useRef } = require('react');
    const VideoPlayer = forwardRef((props, ref) => {
        const videoRef = useRef(null);
        useImperativeHandle(ref, () => ({
            getVideoNode: () => videoRef.current
        }));
        return (
            <div data-testid="video-player">
                <video ref={videoRef} />
                {props.children}
            </div>
        );
    });
    return VideoPlayer;
});

jest.mock('@enact/sandstone/Spinner', () => {
    const Spinner = () => <div data-testid="spinner">Loading...</div>;
    return Spinner;
});

// Mock Hls.js
jest.mock('hls.js', () => {
    const mockHlsInstance = {
        loadSource: jest.fn(),
        attachMedia: jest.fn(),
        on: jest.fn(),
        destroy: jest.fn(),
        detachMedia: jest.fn(),
    };
    const mockHls = jest.fn(() => mockHlsInstance);
    // Assign static properties directly to the mocked function
    mockHls.Events = { MANIFEST_PARSED: 'parsed', ERROR: 'error' };
    mockHls.isSupported = jest.fn(() => true);
    return mockHls;
});

describe('StreamPlayer Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading spinner initially', () => {
        render(<StreamPlayer src="http://example.com/video.m3u8" />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should use Hls.js for m3u8 streams', () => {
        render(<StreamPlayer src="http://example.com/video.m3u8" />);
        expect(Hls).toHaveBeenCalled();
    });

    it('should not use Hls.js for mp4 streams', () => {
        render(<StreamPlayer src="http://example.com/video.mp4" />);
        expect(Hls).not.toHaveBeenCalled();
    });
});
