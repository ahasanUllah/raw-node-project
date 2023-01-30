// Dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandlers } = require('../handlers/routesHandlers/notFoundHandlers');

// module scafolding
const handler = {};

const decoder = new StringDecoder('utf-8');
handler.handleReqRes = function handleReqRes(req, res) {
    // parse the url
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryObject = parseUrl.query;
    const headersObject = req.headers;

    const reqestedProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryObject,
        headersObject,
    };

    let realData = '';
    const choosenHandlers = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandlers;

    choosenHandlers(reqestedProperties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello world');
    });
};

module.exports = handler;
