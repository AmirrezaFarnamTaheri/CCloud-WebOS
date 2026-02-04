import ImageItem from '@enact/sandstone/ImageItem';
import React from 'react';

const Poster = (props) => (
	<ImageItem
		{...props}
		orientation="vertical"
	/>
);

export default Poster;
