const gql = require('graphql-tag');

module.exports = gql`
	scalar Upload

	type File {
		url: String!
		filename: String!
	}

	type Query {
		uploads: [File]
	}

	type Mutation {
		uploadImage(file: Upload!): File!
	}
`;
