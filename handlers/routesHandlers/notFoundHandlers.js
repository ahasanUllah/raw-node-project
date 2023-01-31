// Dependencies

// Module Scafolding
const handler = {};

handler.notFoundHandlers = (reqestedProperties, callback) => {
    console.log(reqestedProperties);
    callback(404, {
        message: 'sorry not found',
    });
};

module.exports = handler;
