import { useContext, useCallback } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import BodyText from '@enact/sandstone/BodyText';
import Image from '@enact/sandstone/Image';
import { FavoritesContext } from '../store/FavoritesContext';

const DetailsPanel = ({ item, onPlay, ...rest }) => {
	const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

	const handleFavoriteClick = useCallback(() => {
		if (item) {
			if (isFavorite(item.id)) {
				removeFavorite(item.id);
			} else {
				addFavorite(item);
			}
		}
	}, [item, isFavorite, addFavorite, removeFavorite]);

	// Fallback if no item selected
	if (!item) return <Panel {...rest}><Header title="Error" /></Panel>;

	const favored = isFavorite(item.id);

	return (
		<Panel {...rest}>
			<Header title={item.title} subtitle={item.subtitle || 'Details'} />
			<div style={{ display: 'flex', flexDirection: 'row', padding: '24px' }}>
				<div style={{ width: '300px', height: '450px', marginRight: '48px' }}>
					<Image
						src={item.poster || item.posterPath}
						style={{ width: '100%', height: '100%' }}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<BodyText>{item.description || 'No description available.'}</BodyText>
					<div style={{ marginTop: '48px' }}>
						<Button onClick={onPlay} icon="play">
							Play
						</Button>
						<Button
							icon={favored ? 'star' : 'starhol'}
							onClick={handleFavoriteClick}
						>
							{favored ? 'Remove Favorite' : 'Add to Favorites'}
						</Button>
					</div>
				</div>
			</div>
		</Panel>
	);
};

export default DetailsPanel;
