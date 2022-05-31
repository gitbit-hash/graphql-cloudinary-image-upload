import React from 'react';
import { createRoot } from 'react-dom/client';
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

const root = createRoot(document.getElementById('root'));

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

// ReactDOM.render(
// 	<ApolloProvider client={client}>
// 		<App />
// 	</ApolloProvider>,
// 	createRoot(document.getElementById('root'))
// );
