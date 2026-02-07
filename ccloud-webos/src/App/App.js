import { useState, useCallback, useContext } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import { FavoritesProvider } from '../store/FavoritesContext';
import { SettingsProvider, SettingsContext } from '../store/SettingsContext';

import HomePanel from '../views/HomePanel';
import DetailsPanel from '../views/DetailsPanel';
import PlayerPanel from '../views/PlayerPanel';

import css from './App.module.less';

const AppContent = () => {
    const { settings } = useContext(SettingsContext);
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
		if (index === 0) {
			return false; // Exit app on back from home
		}

		setIndex((prevIndex) => {
            if (prevIndex === 2) {
                setVideoUrl('');
            }
            return Math.max(0, prevIndex - 1);
		});
		return true;
	}, [index]);

    // Inject dynamic accent color
    const appStyle = {
        '--app-accent-color': settings.accentColor
    };

	return (
        <div className={css.app} style={appStyle}>
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
                    autoPlay={settings.autoplay}
					onBack={handleBack}
				/>
			</Panels>
        </div>
	);
};

const App = (props) => {
    return (
        <SettingsProvider>
            <FavoritesProvider>
                <AppContent {...props} />
            </FavoritesProvider>
        </SettingsProvider>
    );
};

export default ThemeDecorator(App);
