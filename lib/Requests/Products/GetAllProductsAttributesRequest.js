const GetRequest = require('../GetRequest');

class GetAllProductsAttributesRequest extends GetRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'products-v2/attributes-v2');
    }
}

module.exports = GetAllProductsAttributesRequest;
