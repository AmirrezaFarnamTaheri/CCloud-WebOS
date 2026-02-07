import { render, screen, act } from '@testing-library/react';
import { FavoritesProvider, FavoritesContext } from '../../store/FavoritesContext';
import { useContext } from 'react';

const TestComponent = () => {
    const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    return (
        <div>
            <div data-testid="count">{favorites.length}</div>
            <button onClick={() => addFavorite({ id: 1, title: 'Item 1' })}>Add</button>
            <button onClick={() => removeFavorite(1)}>Remove</button>
            <div data-testid="isFav">{isFavorite(1) ? 'Yes' : 'No'}</div>
        </div>
    );
};

describe('FavoritesContext', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should add favorite', async () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        expect(screen.getByTestId('count')).toHaveTextContent('0');
        await act(async () => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('isFav')).toHaveTextContent('Yes');
    });

    it('should remove favorite', async () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        await act(async () => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('1');

        await act(async () => {
            screen.getByText('Remove').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('0');
        expect(screen.getByTestId('isFav')).toHaveTextContent('No');
    });

    it('should persist to localStorage', async () => {
        render(
            <FavoritesProvider>
                <TestComponent />
            </FavoritesProvider>
        );

        await act(async () => {
            screen.getByText('Add').click();
        });

        const stored = JSON.parse(window.localStorage.getItem('favorites'));
        expect(stored).toHaveLength(1);
        expect(stored[0].id).toBe(1);
    });
});
