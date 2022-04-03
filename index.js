const express = require("express");
const { ApolloServer, gql } = require('apollo-server-express');
// const http = require("http");

const app = express();

const port = 4000


const typeDefs = gql`
type Query {
hello: String
}
`;
// Предоставляем функции распознавания для полей схемы
const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};

let server = null;
async function startServer() {
    server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
}
startServer();

// const httpserver = http.createServer(app);

app.listen({port} , () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);