const GetRequest = require('../GetRequest');

class GetOrderStatusByIdRequest extends GetRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} orderReference
     */
    constructor(requestHandler, orderReference) {
        const endpoint = `orders/${orderReference}`;

        super(requestHandler, endpoint);
    }
}

module.exports = GetOrderStatusByIdRequest;
