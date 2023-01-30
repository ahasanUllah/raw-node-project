// Dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');

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

    let realData = '';
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
