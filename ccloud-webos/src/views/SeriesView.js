import { useState, useEffect, useCallback } from 'react';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';

const SeriesView = ({ onNavigate, ...rest }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		// Enhanced Mock data
		const data = Array.from({ length: 100 }).map((_, i) => ({
			id: i,
			title: `Series Title ${i}`,
			description: `This is a detailed description for Series ${i}. Follow the episodes as they unfold in this dramatic portrayal of software development.`,
			poster: 'https://via.placeholder.com/300x450',
            backdrop: 'https://via.placeholder.com/1920x1080',
            rating: (Math.random() * 5 + 5).toFixed(1),
            year: 2018 + (i % 6),
            seasons: `${1 + (i % 8)} Seasons`
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
			itemSize={{ minWidth: 260, minHeight: 440 }}
			spacing={24}
		/>
	);
};

export default SeriesView;
