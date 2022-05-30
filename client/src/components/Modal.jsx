import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';

import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../graphql/mutations';

import { Button, Dimmer, Loader, Message, Modal } from 'semantic-ui-react';

function ModalComponent({ setImageUrl }) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);

	const [uploadImage, { loading, data }] = useMutation(UPLOAD_IMAGE, {
		onCompleted() {
			setSelectedFile(null);
			setCroppedImage(null);
			setImageUrl(data.uploadImage.url);
			setOpen(false);
		},

		onError(err) {
			setError(err.message);
		},
	});

	const onBeforeFileLoad = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
			setError('We only support JPG, JPEG, or PNG pictures.');
			e.target.value = '';
			return;
		}

		setError('');
		setSelectedFile(file);
	};

	const onCrop = async (image64) => {
		try {
			const url = await fetch(image64);

			const blob = await url.blob();

			const { name, type } = selectedFile;

			const file = new File([blob], name, { type });

			setCroppedImage({ file });
		} catch (error) {
			setError(error.message);
		}
	};

	const onUnselectImage = () => {
		setSelectedFile(null);
		setCroppedImage(null);
	};

	const onModalClose = () => {
		setSelectedFile(null);
		setCroppedImage(null);
		setError('');
		setOpen(false);
	};

	const handleClick = () => {
		uploadImage({ variables: { ...croppedImage } });
	};

	return (
		<Modal
			onOpen={() => setOpen(true)}
			onClose={onModalClose}
			open={open}
			trigger={<Button>Select Image</Button>}
		>
			<Modal.Header>Upload image</Modal.Header>
			<Modal.Content>
				{((selectedFile && !croppedImage) || loading) && (
					<Dimmer active>
						<Loader inverted active size='large'>
							Loading...
						</Loader>
					</Dimmer>
				)}
				<Avatar
					width={390}
					height={300}
					imageWidth={285}
					onBeforeFileLoad={onBeforeFileLoad}
					onCrop={onCrop}
					onClose={onUnselectImage}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={onModalClose}>Cancel</Button>
				<Button
					onClick={handleClick}
					disabled={!croppedImage || !selectedFile ? true : false}
					positive
				>
					Ok
				</Button>
			</Modal.Actions>
			{error && (
				<Message
					negative
					style={{
						textAlign: 'center',
					}}
				>
					{error}
				</Message>
			)}
		</Modal>
	);
}

export default ModalComponent;
