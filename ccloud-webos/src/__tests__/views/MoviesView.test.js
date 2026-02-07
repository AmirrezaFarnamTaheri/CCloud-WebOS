import { render, screen } from '@testing-library/react';
import MoviesView from '../../views/MoviesView';

// Mock Enact components
jest.mock('@enact/sandstone/VirtualList', () => ({
    VirtualGridList: (props) => (
        <div data-testid="virtual-grid-list">
            {props.dataSize > 0 && props.itemRenderer({ index: 0, 'data-testid': 'poster' })}
        </div>
    )
}));

jest.mock('../../components/Poster', () => (props) => (
    <div data-testid="poster" onClick={() => props.onClick(props.index)}>{props.label}</div>
));

jest.mock('../../api/mockData', () => ({
    mockMovies: [{ id: 1, title: 'Test Movie', poster: 'test.jpg' }]
}));

describe('MoviesView', () => {
    it('should render VirtualGridList', () => {
        render(<MoviesView />);
        expect(screen.getByTestId('virtual-grid-list')).toBeInTheDocument();
    });

    it('should render movie items', () => {
        render(<MoviesView />);
        expect(screen.getByTestId('poster')).toHaveTextContent('Test Movie');
    });

    it('should call onNavigate when item clicked', () => {
        const onNavigate = jest.fn();
        render(<MoviesView onNavigate={onNavigate} />);
        screen.getByTestId('poster').click();
        expect(onNavigate).toHaveBeenCalledWith({ id: 1, title: 'Test Movie', poster: 'test.jpg' });
    });
});
