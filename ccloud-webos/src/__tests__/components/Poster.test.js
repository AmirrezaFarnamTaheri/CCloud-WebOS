import { render, screen, fireEvent } from '@testing-library/react';
import Poster from '../../components/Poster';

// Mock Enact components
jest.mock('@enact/sandstone/ImageItem', () => {
    return (props) => (
        <div data-testid="image-item" onClick={props.onClick}>
            {props.label}
        </div>
    );
});

describe('Poster Component', () => {
    it('should render with label', () => {
        render(<Poster label="Test Poster" src="test.jpg" index={0} />);
        expect(screen.getByTestId('image-item')).toHaveTextContent('Test Poster');
    });

    it('should call onClick with index', () => {
        const handleClick = jest.fn();
        render(<Poster label="Test Poster" src="test.jpg" index={5} onClick={handleClick} />);

        fireEvent.click(screen.getByTestId('image-item'));
        expect(handleClick).toHaveBeenCalledWith(5);
    });

    it('should handle missing onClick', () => {
        render(<Poster label="Test Poster" src="test.jpg" index={5} />);
        fireEvent.click(screen.getByTestId('image-item'));
        // Should not crash
    });
});
