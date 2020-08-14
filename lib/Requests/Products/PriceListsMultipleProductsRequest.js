const PriceListProductRequest = require('./PriceListProductRequest');

class PriceListsMultipleProductsRequest extends PriceListProductRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'products-v2');
    }

    /**
     * @param {string} productName
     * @return {PriceListsMultipleProductsRequest}
     */
    addProductName(productName) {
        if (!this.payload.productNames) this.payload.productNames = [];

        this.payload.productNames.push(productName);

        return this;
    }
}

module.exports = PriceListsMultipleProductsRequest;
