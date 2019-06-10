const Request = require('./Request');

class GetRequest extends Request {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} endpoint
     */
    constructor(requestHandler, endpoint) {
        super(requestHandler, endpoint, Request.GET);
    }
}

module.exports = GetRequest;
