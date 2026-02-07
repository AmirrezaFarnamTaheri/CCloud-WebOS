import { render, screen } from '@testing-library/react';
import FavoritesView from '../../views/FavoritesView';
import { FavoritesContext } from '../../store/FavoritesContext';

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

describe('FavoritesView', () => {
    const mockFavorites = [{ id: 1, title: 'Fav Movie', poster: 'fav.jpg' }];

    it('should render favorites if present', () => {
        render(
            <FavoritesContext.Provider value={{ favorites: mockFavorites }}>
                <FavoritesView />
            </FavoritesContext.Provider>
        );
        expect(screen.getByTestId('virtual-grid-list')).toBeInTheDocument();
        expect(screen.getByTestId('poster')).toHaveTextContent('Fav Movie');
    });

    it('should render empty if no favorites', () => {
        render(
            <FavoritesContext.Provider value={{ favorites: [] }}>
                <FavoritesView />
            </FavoritesContext.Provider>
        );
        expect(screen.queryByTestId('poster')).not.toBeInTheDocument();
    });

    it('should call onNavigate when item clicked', () => {
        const onNavigate = jest.fn();
        render(
            <FavoritesContext.Provider value={{ favorites: mockFavorites }}>
                <FavoritesView onNavigate={onNavigate} />
            </FavoritesContext.Provider>
        );
        screen.getByTestId('poster').click();
        expect(onNavigate).toHaveBeenCalledWith(mockFavorites[0]);
    });
});
