const PostRequest = require('../PostRequest');

class FetchOrdersByReferenceRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'orders/ordersStatus');
    }

    /**
     * @param {string} orderReference
     * @return {FetchOrdersByReferenceRequest}
     */
    addOrderReference(orderReference) {
        if (!this.payload.orderReferences) this.payload.orderReferences = [];

        this.payload.orderReferences.push(orderReference);

        return this;
    }
}

module.exports = FetchOrdersByReferenceRequest;
