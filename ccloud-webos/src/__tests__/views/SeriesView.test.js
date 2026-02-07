import { render, screen } from '@testing-library/react';
import SeriesView from '../../views/SeriesView';

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
    mockSeries: [{ id: 1, title: 'Test Series', poster: 'test.jpg' }]
}));

describe('SeriesView', () => {
    it('should render VirtualGridList', () => {
        render(<SeriesView />);
        expect(screen.getByTestId('virtual-grid-list')).toBeInTheDocument();
    });

    it('should render series items', () => {
        render(<SeriesView />);
        expect(screen.getByTestId('poster')).toHaveTextContent('Test Series');
    });

    it('should call onNavigate when item clicked', () => {
        const onNavigate = jest.fn();
        render(<SeriesView onNavigate={onNavigate} />);
        screen.getByTestId('poster').click();
        expect(onNavigate).toHaveBeenCalledWith({ id: 1, title: 'Test Series', poster: 'test.jpg' });
    });
});
