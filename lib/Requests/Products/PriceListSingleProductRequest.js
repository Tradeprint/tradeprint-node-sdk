const PriceListProductRequest = require('./PriceListProductRequest');

class PriceListSingleProductRequest extends PriceListProductRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} productName
     */
    constructor(requestHandler, productName) {
        const endpoint = `products-v2/${productName}`;

        super(requestHandler, endpoint);
    }
}

module.exports = PriceListSingleProductRequest;
