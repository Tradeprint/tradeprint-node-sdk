const PostRequest = require('../PostRequest');

class RetryPaymentRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} orderReference
     */
    constructor(requestHandler, orderReference) {
        const endpoint = `orders/${orderReference}/retryPayment`;

        super(requestHandler, endpoint);
    }
}

module.exports = RetryPaymentRequest;
