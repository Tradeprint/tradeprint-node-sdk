const ApiService = require('./ApiService');

const SubmitNewOrderRequest = require('../Requests/Orders/SubmitNewOrderRequest');
const ValidateOrderRequest = require('../Requests/Orders/ValidateOrderRequest');
const UploadReplaceArtwokRequest = require('../Requests/Orders/UploadReplaceArtwokRequest');
const GetOrderStatusByIdRequest = require('../Requests/Orders/GetOrderStatusByIdRequest');
const FetchOrdersByReferenceRequest = require('../Requests/Orders/FetchOrdersByReferenceRequest');
const CancelOrderItemRequest = require('../Requests/Orders/CancelOrderItemRequest');

class OrderService extends ApiService {
    constructor() {
        super();
    }

    /**
     * @return {SubmitNewOrderRequest}
     */
    submitNewOrderRequest() {
        return new SubmitNewOrderRequest(this.getRequestHandler());
    }

    /**
     * @return {ValidateOrderRequest}
     */
    validateOrderRequest() {
        return new ValidateOrderRequest(this.getRequestHandler());
    }

    /**
     * @param {string} orderReference
     * @param {string} itemReference
     * @return {UploadReplaceArtwokRequest}
     */
    uploadReplaceArtworkRequest(orderReference, itemReference) {
        this.verifyInput(this.constructor.name, { orderReference, itemReference });

        return new UploadReplaceArtwokRequest(this.getRequestHandler(), orderReference, itemReference);
    }

    /**
     * @param {string} orderReference
     * @return {GetOrderStatusByIdRequest}
     */
    getOrderStatusByIdRequest(orderReference) {
        this.verifyInput(this.constructor.name, { orderReference });

        return new GetOrderStatusByIdRequest(this.getRequestHandler(), orderReference);
    }

    /**
     * @return {FetchOrdersByReferenceRequest}
     */
    fetchOrdersByReferenceRequest() {
        return new FetchOrdersByReferenceRequest(this.getRequestHandler());
    }

    /**
     * @param {string} orderReference
     * @param {string} itemReference
     * @return {CancelOrderItemRequest}
     */
    cancelOrderItemRequest(orderReference, itemReference) {
        this.verifyInput(this.constructor.name, { orderReference, itemReference });

        return new CancelOrderItemRequest(this.getRequestHandler(), orderReference, itemReference);
    }
}

module.exports = OrderService;
