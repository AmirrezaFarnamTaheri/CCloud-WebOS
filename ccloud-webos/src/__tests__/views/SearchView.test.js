import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchView from '../../views/SearchView';

// Mock Enact components
jest.mock('@enact/sandstone/Input', () => (props) => (
    <input
        data-testid="search-input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange({ value: e.target.value })}
    />
));
jest.mock('@enact/sandstone/BodyText', () => (props) => <div data-testid="body-text">{props.children}</div>);
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
    searchMockData: jest.fn((q) => [{ id: q.length, title: 'Result Movie', poster: 'res.jpg' }])
}));

import { searchMockData } from '../../api/mockData';

describe('SearchView', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        searchMockData.mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render search input', () => {
        render(<SearchView />);
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('should debounce search input', async () => {
        render(<SearchView />);
        const input = screen.getByTestId('search-input');

        fireEvent.change(input, { target: { value: 'test' } });

        // Before delay
        expect(searchMockData).not.toHaveBeenCalled();

        // Fast-forward
        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(searchMockData).toHaveBeenCalledWith('test');
    });

    it('should display results', async () => {
        render(<SearchView />);
        const input = screen.getByTestId('search-input');

        fireEvent.change(input, { target: { value: 'test' } });
        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(screen.getByTestId('poster')).toHaveTextContent('Result Movie');
    });
});
