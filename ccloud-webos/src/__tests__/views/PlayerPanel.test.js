import { render, screen } from '@testing-library/react';
import PlayerPanel from '../../views/PlayerPanel';

// Mock Enact components
jest.mock('@enact/sandstone/Panels', () => ({
    Panel: (props) => <div data-testid="panel">{props.children}</div>
}));

// Mock StreamPlayer
jest.mock('../../components/StreamPlayer', () => (props) => (
    <div data-testid="stream-player" data-src={props.src} />
));

	describe('PlayerPanel', () => {
	    it('should render StreamPlayer with correct props', () => {
	        const url = 'http://example.com/video.mp4';
	        render(<PlayerPanel url={url} autoPlay />);

        const player = screen.getByTestId('stream-player');
        expect(player).toBeInTheDocument();
        expect(player).toHaveAttribute('data-src', url);
    });
});
