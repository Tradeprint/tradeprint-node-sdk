const PostRequest = require('../PostRequest');

class ProductQuantitiesRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'products-v2/quantities-v2');
    }

    /**
     * @param {string} productId
     * @return {ProductQuantitiesRequest}
     */
    setProductId(productId) {
        this.payload.productId = productId;

        return this;
    }

    /**
     * @param {string} serviceLevel
     * @return {ProductQuantitiesRequest}
     */
    setServiceLevel(serviceLevel) {
        this.payload.serviceLevel = serviceLevel;

        return this;
    }

    /**
     * @param {Object} productionData
     * @return {ProductQuantitiesRequest}
     */
    setProductionData(productionData) {
        this.payload.productionData = productionData;

        return this;
    }
}

module.exports = ProductQuantitiesRequest;
