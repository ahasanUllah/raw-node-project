// Dependencies

// Module Scafolding
const handler = {};

handler.sampleHandlers = (reqestedProperties, callback) => {
    console.log(reqestedProperties);
    callback(200, { message: 'This is body' });
};

module.exports = handler;
