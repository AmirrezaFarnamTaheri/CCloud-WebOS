import { useCallback } from 'react';
import ImageItem from '@enact/sandstone/ImageItem';
import css from './Poster.module.less';

const Poster = ({ index, onClick, label, src, ...rest }) => {
	const handleClick = useCallback(() => {
		if (onClick) {
			onClick(index);
		}
	}, [index, onClick]);

	return (
		<ImageItem
			{...rest}
            className={css.poster}
			src={src}
            label={label}
			onClick={handleClick}
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden'
            }}
            caption={label}
            centered
            labelPosition="below"
            placeholder={src} // Immediate placeholder
		>
            {/* Child content if needed, but caption handles text */}
		</ImageItem>
	);
};

export default Poster;
