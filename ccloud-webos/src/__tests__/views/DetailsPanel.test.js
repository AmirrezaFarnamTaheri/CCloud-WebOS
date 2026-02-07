import { render, screen, fireEvent } from '@testing-library/react';
import DetailsPanel from '../../views/DetailsPanel';
import { FavoritesContext } from '../../store/FavoritesContext';

// Mock Enact components
jest.mock('@enact/sandstone/Panels', () => ({
    Panel: (props) => <div data-testid="panel">{props.children}</div>,
    Header: (props) => <div data-testid="header">{props.title}</div>
}));
jest.mock('@enact/sandstone/Button', () => (props) => <button onClick={props.onClick}>{props.children}</button>);
jest.mock('@enact/sandstone/BodyText', () => (props) => <div>{props.children}</div>);
jest.mock('@enact/sandstone/Image', () => (props) => <img src={props.src} alt="" />);

describe('DetailsPanel', () => {
    const mockItem = {
        id: 1,
        title: 'Test Movie',
        description: 'Test Description',
        poster: 'test.jpg'
    };

    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();
    const mockIsFavorite = jest.fn();

    const renderDetailsPanel = (item, isFav = false) => {
        mockIsFavorite.mockReturnValue(isFav);
        return render(
            <FavoritesContext.Provider value={{
                addFavorite: mockAddFavorite,
                removeFavorite: mockRemoveFavorite,
                isFavorite: mockIsFavorite
            }}>
                <DetailsPanel item={item} onPlay={jest.fn()} />
            </FavoritesContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render item details', () => {
        renderDetailsPanel(mockItem);
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('should show "Add to Favorites" when not favorite', () => {
        renderDetailsPanel(mockItem, false);
        expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });

    it('should show "Remove Favorite" when favorite', () => {
        renderDetailsPanel(mockItem, true);
        expect(screen.getByText('Remove Favorite')).toBeInTheDocument();
    });

    it('should call addFavorite on click', () => {
        renderDetailsPanel(mockItem, false);
        fireEvent.click(screen.getByText('Add to Favorites'));
        expect(mockAddFavorite).toHaveBeenCalledWith(mockItem);
    });

    it('should call removeFavorite on click', () => {
        renderDetailsPanel(mockItem, true);
        fireEvent.click(screen.getByText('Remove Favorite'));
        expect(mockRemoveFavorite).toHaveBeenCalledWith(mockItem.id);
    });

    it('should render error header if no item', () => {
        render(
            <FavoritesContext.Provider value={{ isFavorite: jest.fn() }}>
                <DetailsPanel item={null} />
            </FavoritesContext.Provider>
        );
        expect(screen.getByTestId('header')).toHaveTextContent('Error');
    });
});
