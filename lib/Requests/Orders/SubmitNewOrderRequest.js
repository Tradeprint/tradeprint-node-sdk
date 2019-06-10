const SubmitValidateOrderRequest = require('./SubmitValidateOrderRequest');

class SubmitNewOrderRequest extends SubmitValidateOrderRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'orders');
    }
}

module.exports = SubmitNewOrderRequest;
