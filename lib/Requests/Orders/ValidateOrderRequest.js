const SubmitValidateOrderRequest = require('./SubmitValidateOrderRequest');

class ValidateOrderRequest extends SubmitValidateOrderRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'validate/orders');
    }
}

module.exports = ValidateOrderRequest;
