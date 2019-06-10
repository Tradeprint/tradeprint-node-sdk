const Request = require('../Request');

class CancelOrderItemRequest extends Request {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} orderReference
     * @param {string} itemReference
     */
    constructor(requestHandler, orderReference, itemReference) {
        const endpoint = `orders/${orderReference}/orderItems/${itemReference}`;

        super(requestHandler, endpoint, Request.DELETE);
    }
}

module.exports = CancelOrderItemRequest;
