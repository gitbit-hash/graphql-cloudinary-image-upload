import React from 'react';
import ReactDOM from 'react-dom';

import { createUploadLink } from 'apollo-upload-client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

const httpLink = createUploadLink({
	uri: 'http://localhost:5000/graphql',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: httpLink,
	cache,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
