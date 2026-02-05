import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (typeof window === 'undefined' || !window.localStorage) return;

		let storedFavorites = [];
		try {
			const parsed = JSON.parse(window.localStorage.getItem('favorites')) || [];
            storedFavorites = Array.isArray(parsed) ? parsed : [];
		} catch (e) {
			storedFavorites = [];
		}
		setFavorites(storedFavorites);
	}, []);

	const addFavorite = (item) => {
        if (!item || item.id == null) return;

		setFavorites((prev) => {
            if (prev.some((f) => f && f.id === item.id)) return prev;

			const next = [...prev, item];
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
        if (id == null) return;

		setFavorites((prev) => {
			const next = prev.filter((item) => item && item.id !== id);
            if (next.length === prev.length) return prev;

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
        if (id == null) return false;
		return favorites.some((item) => item && item.id === id);
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};
