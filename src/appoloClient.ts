import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({

    uri: 'localhost:8081/graphql',
    cache: new InMemoryCache(),

});

export default client;
