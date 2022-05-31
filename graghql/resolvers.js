import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import { ValidationError } from 'apollo-server';

import processUpload from '../utils/proccess-upload.js';

export default {
	Upload: GraphQLUpload,

	Mutation: {
		async uploadImage(_, { file }) {
			//  1. Validate file metadata.
			const { filename } = await file;

			if (!/\.(jpg|jpeg|png)$/i.test(filename)) {
				throw new ValidationError('Please select an image file');
			}

			// 2. Stream file contents into cloud storage:
			const url = await processUpload(file);

			return { url, filename };
		},
	},
};
