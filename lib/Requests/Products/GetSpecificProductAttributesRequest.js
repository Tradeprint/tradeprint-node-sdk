const GetRequest = require('../GetRequest');

class GetSpecificProductAttributesRequest extends GetRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} productName
     */
    constructor(requestHandler, productName) {
        const endpoint = `products-v2/attributes-v2/${productName}`;

        super(requestHandler, endpoint);
    }
}

module.exports = GetSpecificProductAttributesRequest;
