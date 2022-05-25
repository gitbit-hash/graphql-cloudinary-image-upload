const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./graghql/typeDefs');
const resolvers = require('./graghql/resolvers');
const { graphqlUploadExpress } = require('graphql-upload');

const app = express();

app.use(cors());
app.use(graphqlUploadExpress());

const server = new ApolloServer({
	typeDefs,
	resolvers,
	uploads: false,
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT }, () =>
	console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
);
