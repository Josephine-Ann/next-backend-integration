const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');
const { ApolloServer, gql } = require('apollo-server-express')

app.prepare().then(() => {
    const server = express();

    // Server-side
    const route = pathMatch();

    server.get('/anything', (req, res) => {
        const params = route('/anything')(parse(req.url).pathname);
        return app.render(req, res, '/anything', params);
    });

    server.get('/stories', (req, res) => {
        const params = route('/stories')(parse(req.url).pathname);
        return app.render(req, res, '/stories', params);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    /* eslint-disable no-console */
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server ready on http://localhost:3000');
    });
});
