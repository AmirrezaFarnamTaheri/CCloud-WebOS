import { useContext, useCallback } from 'react';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';
import { FavoritesContext } from '../store/FavoritesContext';

const FavoritesView = ({ onNavigate, ...rest }) => {
	const { favorites } = useContext(FavoritesContext);

	const handleItemClick = useCallback((index) => {
		if (onNavigate) {
			onNavigate(favorites[index]);
		}
	}, [favorites, onNavigate]);

	const renderItem = useCallback(({ index, ...itemRest }) => {
		const item = favorites[index];
		if (!item) return null;

        const posterSrc = item.posterPath || item.poster || item.backdrop;

		return (
			<Poster
				{...itemRest}
				key={item.id}
				index={index}
				src={posterSrc}
				label={item.title}
				onClick={handleItemClick}
			>
				{item.title}
			</Poster>
		);
	}, [favorites, handleItemClick]);

	return (
		<VirtualGridList
			{...rest}
			dataSize={favorites.length}
			itemRenderer={renderItem}
			itemSize={{ minWidth: 300, minHeight: 450 }}
			spacing={20}
		/>
	);
};

export default FavoritesView;
