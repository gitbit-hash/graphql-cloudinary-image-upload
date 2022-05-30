import React, { useState } from 'react';

import Modal from './components/Modal';
import ImageLink from './components/ImgaeLink';

import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
	const [imageUrl, setImageUrl] = useState('');
	return (
		<Container>
			<Modal setImageUrl={setImageUrl} />
			<ImageLink imageUrl={imageUrl} />
		</Container>
	);
};

export default App;
