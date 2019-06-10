const ApiService = require('./ApiService');

const PriceListsMultipleProductsRequest = require('../Requests/Products/PriceListsMultipleProductsRequest');
const PriceListSingleProductRequest = require('../Requests/Products/PriceListSingleProductRequest');
const GetAllProductsAttributesRequest = require('../Requests/Products/GetAllProductsAttributesRequest');
const GetSpecificProductAttributesRequest = require('../Requests/Products/GetSpecificProductAttributesRequest');
const ProductQuantitiesRequest = require('../Requests/Products/ProductQuantitiesRequest');
const GetExpectedDeliveryDateRequest = require('../Requests/Products/GetExpectedDeliveryDateRequest');

class ProductService extends ApiService {
    constructor() {
        super();
    }

    /**
     * @return {PriceListsMultipleProductsRequest}
     */
    priceListsMultipleProductsRequest() {
        return new PriceListsMultipleProductsRequest(this.getRequestHandler());
    }

    /**
     * @param {string} productName
     * @return {PriceListSingleProductRequest}
     */
    priceListSingleProductRequest(productName) {
        this.verifyInput(this.constructor.name, { productName });

        return new PriceListSingleProductRequest(this.getRequestHandler(), productName);
    }

    /**
     * @return {GetAllProductsAttributesRequest}
     */
    getAllProductsAttributesRequest() {
        return new GetAllProductsAttributesRequest(this.getRequestHandler());
    }

    /**
     * @param {string} productName
     * @return {GetSpecificProductAttributesRequest}
     */
    getSpecificProductAttributesRequest(productName) {
        this.verifyInput(this.constructor.name, { productName });

        return new GetSpecificProductAttributesRequest(this.getRequestHandler(), productName);
    }

    /**
     * @return {ProductQuantitiesRequest}
     */
    productQuantitiesRequest() {
        return new ProductQuantitiesRequest(this.getRequestHandler());
    }

    /**
     * @return {GetExpectedDeliveryDateRequest}
     */
    getExpectedDeliveryDateRequest() {
        return new GetExpectedDeliveryDateRequest(this.getRequestHandler());
    }
}

module.exports = ProductService;
