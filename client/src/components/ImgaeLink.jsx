import React from 'react';
import { Image } from 'semantic-ui-react';

const ImageExampleLink = ({ imageUrl }) => (
	<Image
		src={imageUrl}
		as='a'
		size='medium'
		href={imageUrl}
		target='_blank'
		style={{ display: 'block' }}
	/>
);

export default ImageExampleLink;
