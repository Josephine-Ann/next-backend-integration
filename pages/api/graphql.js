import Cors from 'micro-cors';
import { gql, ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const storiesArray = [
    { id: '1', name: 'Anna', story: "chef" },
    { id: '2', name: 'Ralph', story: "artist" }
]

const cors = Cors()

const typeDefs = gql`
        type Story {
            id: ID
            name: String
            story: String
        }
        type Query {
            stories: [Story!]!
        }
    `

const resolvers = {
    Query: {
        stories: () => storiesArray
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
});


export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await startServer
    await apolloServer.getMiddleware({
        path: '/api/graphql'
    })(req, res)
});

