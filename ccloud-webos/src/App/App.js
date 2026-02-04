import { useState, useCallback } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import { FavoritesProvider } from '../store/FavoritesContext';

import HomePanel from '../views/HomePanel';
import DetailsPanel from '../views/DetailsPanel';
import PlayerPanel from '../views/PlayerPanel';

const App = () => {
	const [index, setIndex] = useState(0);
	const [selectedItem, setSelectedItem] = useState(null);
	const [videoUrl, setVideoUrl] = useState('');

	// Navigate to Details
	const handleNavigateDetails = useCallback((item) => {
		setSelectedItem(item);
		setIndex(1);
	}, []);

	// Navigate to Player
	const handlePlay = useCallback(() => {
		// Mock URL for now, or use item.url if available
		const url = selectedItem && selectedItem.url ? selectedItem.url : 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
		setVideoUrl(url);
		setIndex(2);
	}, [selectedItem]);

	// Handle Back Button
	const handleBack = useCallback(() => {
		setIndex((prevIndex) => Math.max(0, prevIndex - 1));
	}, []);

	return (
		<FavoritesProvider>
			<Panels
				index={index}
				onBack={handleBack}
			>
				<HomePanel
					onNavigate={handleNavigateDetails}
				/>
				<DetailsPanel
					item={selectedItem}
					onPlay={handlePlay}
				/>
				<PlayerPanel
					url={videoUrl}
					onBack={handleBack}
				/>
			</Panels>
		</FavoritesProvider>
	);
};

export default ThemeDecorator(App);
