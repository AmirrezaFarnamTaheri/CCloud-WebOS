import React, { useState, useEffect } from 'react';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import Poster from '../components/Poster';

const MoviesView = (props) => {
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

	const renderItem = ({ index, ...rest }) => {
		const item = items[index];
		return (
			<Poster
				{...rest}
				key={index}
				src={item.poster}
				label={item.title}
                onClick={() => console.log('Clicked movie', item.id)}
			>
				{item.title}
			</Poster>
		);
	};

	return (
		<VirtualGridList
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{ minWidth: 300, minHeight: 450 }}
            spacing={20}
		/>
	);
};

export default MoviesView;
