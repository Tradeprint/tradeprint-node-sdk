const Request = require('./Request');

class PostRequest extends Request {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} endpoint
     */
    constructor(requestHandler, endpoint) {
        super(requestHandler, endpoint, Request.POST);

        this.payload = {};
    }
}

module.exports = PostRequest;
