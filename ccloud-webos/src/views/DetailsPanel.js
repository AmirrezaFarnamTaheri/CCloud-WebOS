import { useContext, useCallback } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import BodyText from '@enact/sandstone/BodyText';
import Image from '@enact/sandstone/Image';
import { FavoritesContext } from '../store/FavoritesContext';

import css from './DetailsPanel.module.less';

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
	const bgImage = item.backdrop || item.poster || item.posterPath;

	return (
		<Panel {...rest} className={css.panel} style={{ backgroundImage: `url(${bgImage})` }}>
			{/* Minimal Header to allow Back button functionality but kept transparent/minimal */}
			<Header type="mini" slot="header" />

			<div className={css.overlay}>
				<div className={css.contentRow}>
					<Image
						src={item.poster || item.posterPath}
						className={css.poster}
						sizing="cover"
					/>
					<div className={css.info}>
						<div className={css.title}>{item.title}</div>

						<div className={css.metadata}>
							{item.rating && <span className={css.rating}>★ {item.rating}</span>}
							{item.year && <span>{item.year}</span>}
							{item.duration && <span>{item.duration}</span>}
							{item.seasons && <span>{item.seasons}</span>}
						</div>

						<BodyText className={css.description}>
							{item.description || 'No description available for this content.'}
						</BodyText>

						<div className={css.actions}>
							<Button
								onClick={onPlay}
								icon="play"
								backgroundOpacity="transparent"
								className={css.playButton}
							>
								Play
							</Button>
							<Button
								icon={favored ? 'star' : 'starhol'}
								onClick={handleFavoriteClick}
								backgroundOpacity="transparent"
							>
								{favored ? 'Remove Favorite' : 'Add to Favorites'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Panel>
	);
};

export default DetailsPanel;
