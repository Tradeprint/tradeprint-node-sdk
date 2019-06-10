const PostRequest = require('../PostRequest');
const OrderItem = require('../../OrderItem');

const DEFAULT_CURRENCY = 'GBP';

class SubmitValidateOrderRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} endpoint
     */
    constructor(requestHandler, endpoint) {
        super(requestHandler, endpoint);

        this.payload.orderItems = [];
    }

    /**
     * @param {string} currency
     * @return {SubmitValidateOrderRequest}
     */
    setCurrency(currency = DEFAULT_CURRENCY) {
        this.payload.currency = currency;

        return this;
    }

    /**
     * @param {string} orderReference
     * @return {SubmitValidateOrderRequest}
     */
    setOrderReference(orderReference) {
        this.payload.orderReference = orderReference;

        return this;
    }

    /**
     * @param {Object} billingAddress
     * @return {SubmitValidateOrderRequest}
     */
    setBillingAddress(billingAddress) {
        this.payload.billingAddress = billingAddress;

        return this;
    }

    /**
     * @return {OrderItem}
     */
    addOrderItem() {
        const orderItem = new OrderItem();

        this.payload.orderItems.push(orderItem);

        return orderItem;
    }
}

module.exports = SubmitValidateOrderRequest;
