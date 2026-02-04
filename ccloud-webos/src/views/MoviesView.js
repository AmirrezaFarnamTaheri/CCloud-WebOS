import { useState, useEffect, useCallback } from 'react';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';

const MoviesView = ({ onNavigate, ...rest }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		// Mock data for initial setup
		const data = Array.from({ length: 100 }).map((_, i) => ({
			id: i,
			title: `Movie ${i}`,
			description: `Description for Movie ${i}`,
			poster: 'https://via.placeholder.com/300x450'
		}));
		setItems(data);
	}, []);

	const handleItemClick = useCallback((index) => {
		if (onNavigate) {
			onNavigate(items[index]);
		}
	}, [items, onNavigate]);

	const renderItem = useCallback(({ index, ...itemRest }) => {
		const item = items[index];
		return (
			<Poster
				{...itemRest}
				key={index}
				index={index}
				src={item.poster}
				label={item.title}
				onClick={handleItemClick}
			>
				{item.title}
			</Poster>
		);
	}, [items, handleItemClick]);

	return (
		<VirtualGridList
			{...rest}
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{ minWidth: 300, minHeight: 450 }}
			spacing={20}
		/>
	);
};

export default MoviesView;
