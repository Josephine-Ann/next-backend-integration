const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

app.prepare().then(async () => {
    const server = express();

    // Server-side
    const route = pathMatch();

    server.get('/anything', (req, res) => {
        const params = route('/anything')(parse(req.url).pathname);
        return app.render(req, res, '/anything', params);
    });

    server.get('/graphql', (req, res) => {
        const params = route('/graphql')(parse(req.url).pathname);
        return app.render(req, res, '/graphql', params);
    });

    server.get('/stories', (req, res) => {
        const params = route('/stories')(parse(req.url).pathname);
        return app.render(req, res, '/stories', params);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    // const serverStart = apolloServer.start();

    /* eslint-disable no-console */
    server.listen(3000, async (err) => {
        if (err) throw err;
        console.log('Server ready on http://localhost:3000');
    });
});


