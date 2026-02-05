import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (typeof window === 'undefined' || !window.localStorage) return;

		let storedFavorites = [];
		try {
			storedFavorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
		} catch (e) {
			storedFavorites = [];
		}
		setFavorites(storedFavorites);
	}, []);

	const addFavorite = (item) => {
		setFavorites((prev) => {
			const next = prev.some((f) => f.id === item.id) ? prev : [...prev, item];
			try {
				if (typeof window !== 'undefined' && window.localStorage) {
					window.localStorage.setItem('favorites', JSON.stringify(next));
				}
			} catch (e) {
				console.warn('Failed to persist favorites', e);
			}
			return next;
		});
	};

	const removeFavorite = (id) => {
		setFavorites((prev) => {
			const next = prev.filter((item) => item.id !== id);
			try {
				if (typeof window !== 'undefined' && window.localStorage) {
					window.localStorage.setItem('favorites', JSON.stringify(next));
				}
			} catch (e) {
				console.warn('Failed to persist favorites', e);
			}
			return next;
		});
	};

	const isFavorite = (id) => {
		return favorites.some((item) => item.id === id);
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};
