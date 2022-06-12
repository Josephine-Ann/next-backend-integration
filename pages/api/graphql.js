import Cors from 'micro-cors';
import { gql, ApolloServer } from 'apollo-server-micro';

export const config = {
    api: {
        bodyParser: false
    }
}

const storiesArray = [
    { id: '1', name: 'Anna', story: "chef" },
    { id: '2', name: 'Ralph', story: "artist" },
]

const typeDefs = gql`
        type Story {
            id: ID
            name: String
            story: String
        }
        type Query {
            stories: [Story]
        }
    `
const resolvers = {
    Query: {
        stories: () => storiesArray
    }
}

const cors = Cors()

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
})

const serverStart = apolloServer.start();

cors(async (req, res) => {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await serverStart;
    await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
})

