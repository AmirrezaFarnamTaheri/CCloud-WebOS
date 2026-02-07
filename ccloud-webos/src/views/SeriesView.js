import { useState, useEffect, useCallback } from 'react';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';
import { mockSeries } from '../api/mockData';

const SeriesView = ({ onNavigate, ...rest }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(mockSeries);
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
			/>
		);
	}, [items, handleItemClick]);

	return (
		<VirtualGridList
			{...rest}
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{ minWidth: 260, minHeight: 440 }}
			spacing={24}
            wrap
		/>
	);
};

export default SeriesView;
