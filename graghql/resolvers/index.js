const { GraphQLUpload } = require('graphql-upload');

const { ValidationError } = require('apollo-server');

const processUpload = require('../../utils/proccess-upload');

module.exports = {
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
