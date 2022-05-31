import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import typeDefs from './graghql/typeDefs.js';
import resolvers from './graghql/resolvers.js';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		uploads: false,
	});

	await server.start();

	const app = express();

	app.use(cors());

	// This middleware should be added before calling `applyMiddleware`.
	app.use(graphqlUploadExpress());

	server.applyMiddleware({ app });

	await new Promise((r) => app.listen({ port: 5000 }, r));

	console.log(`Server ready at http://localhost:5000${server.graphqlPath}`);
}

startServer();
