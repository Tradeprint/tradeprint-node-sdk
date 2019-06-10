const GetRequest = require('../GetRequest');

class GetAllProductsAttributesRequest extends GetRequest {
    /**
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        super(requestHandler, 'products/attributes');
    }
}

module.exports = GetAllProductsAttributesRequest;
