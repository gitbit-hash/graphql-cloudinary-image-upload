import cloudinary from 'cloudinary';
import sharp from 'sharp';

import {
	CLOUDINARY_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
} from '../config.js';

export default async (upload) => {
	const { createReadStream } = await upload;

	const stream = createReadStream();

	cloudinary.config({
		cloud_name: CLOUDINARY_NAME,
		api_key: CLOUDINARY_API_KEY,
		api_secret: CLOUDINARY_API_SECRET,
	});

	let imageUrl = '';

	const cloudinaryUpload = async ({ stream }) => {
		try {
			await new Promise((resolve, reject) => {
				const streamLoad = cloudinary.v2.uploader.upload_stream(
					(error, result) => {
						if (result) {
							imageUrl = result.secure_url;
							resolve(imageUrl);
						} else {
							reject(error);
						}
					}
				);

				const transformer = sharp()
					.resize({
						width: 400,
						height: 400,
					})
					.png();

				stream.pipe(transformer).pipe(streamLoad);
			});
		} catch (err) {
			throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
		}
	};

	await cloudinaryUpload({ stream });

	return imageUrl;
};
