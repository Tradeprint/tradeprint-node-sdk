const PostRequest = require('../PostRequest');

class GetExpectedDeliveryDateRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'products/expectedDeliveryDate');
    }

    /**
     * @param {number} quantity
     * @return {GetExpectedDeliveryDateRequest}
     */
    setQuantity(quantity) {
        this.payload.quantity = quantity;

        return this;
    }

    /**
     * @param {string} productId
     * @return {GetExpectedDeliveryDateRequest}
     */
    setProductId(productId) {
        this.payload.productId = productId;

        return this;
    }

    /**
     * @param {string} serviceLevel
     * @return {GetExpectedDeliveryDateRequest}
     */
    setServiceLevel(serviceLevel) {
        this.payload.serviceLevel = serviceLevel;

        return this;
    }

    /**
     * @param {Object} productionData
     * @return {GetExpectedDeliveryDateRequest}
     */
    setProductionData(productionData) {
        this.payload.productionData = productionData;

        return this;
    }

    /**
     * @param {string} artworkService
     * @return {GetExpectedDeliveryDateRequest}
     */
    setArtworkService(artworkService) {
        this.payload.artworkService = artworkService;

        return this;
    }

    /**
     * @param {string} postcode
     * @return {GetExpectedDeliveryDateRequest}
     */
    setDeliveryAddressPostcode(postcode) {
        if (!this.payload.deliveryAddress) this.payload.deliveryAddress = {};

        this.payload.deliveryAddress.postcode = postcode;

        return this;
    }
}

module.exports = GetExpectedDeliveryDateRequest;
