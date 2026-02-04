import ImageItem from '@enact/sandstone/ImageItem';
import { useCallback } from 'react';

const Poster = ({ onClick, index, ...rest }) => {
	const handleClick = useCallback(() => {
		if (onClick) {
			onClick(index);
		}
	}, [index, onClick]);

	return (
		<ImageItem
			{...rest}
			onClick={handleClick}
			orientation="vertical"
		/>
	);
};

export default Poster;
