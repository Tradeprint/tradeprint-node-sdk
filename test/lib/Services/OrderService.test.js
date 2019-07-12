/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const CancelOrderItemRequest = require('../../../lib/Requests/Orders/CancelOrderItemRequest');
const SubmitNewOrderRequest = require('../../../lib/Requests/Orders/SubmitNewOrderRequest');
const ValidateOrderRequest = require('../../../lib/Requests/Orders/ValidateOrderRequest');
const UploadReplaceArtwokRequest = require('../../../lib/Requests/Orders/UploadReplaceArtwokRequest');
const GetOrderStatusByIdRequest = require('../../../lib/Requests/Orders/GetOrderStatusByIdRequest');
const FetchOrdersByReferenceRequest = require('../../../lib/Requests/Orders/FetchOrdersByReferenceRequest');
const RetryPaymentRequest = require('../../../lib/Requests/Orders/RetryPaymentRequest');
const OrderService = require('../../../lib/Services/OrderService');

const subjectInstance = new OrderService();

describe('When I call the OrderService request creation methods', function() {
    const validScenarios = [
        {
            method: (a, b) => subjectInstance.cancelOrderItemRequest(a, b),
            targetClass: CancelOrderItemRequest
        },
        {
            method: () => subjectInstance.fetchOrdersByReferenceRequest(),
            targetClass: FetchOrdersByReferenceRequest
        },
        {
            method: a => subjectInstance.getOrderStatusByIdRequest(a),
            targetClass: GetOrderStatusByIdRequest
        },
        {
            method: () => subjectInstance.submitNewOrderRequest(),
            targetClass: SubmitNewOrderRequest
        },
        {
            method: () => subjectInstance.validateOrderRequest(),
            targetClass: ValidateOrderRequest
        },
        {
            method: (a, b) => subjectInstance.uploadReplaceArtworkRequest(a, b),
            targetClass: UploadReplaceArtwokRequest
        },
        {
            method: (a, b) => subjectInstance.retryPaymentRequest(a),
            targetClass: RetryPaymentRequest
        }
    ];

    validScenarios.forEach(s => {
        it(`Then the method with valid input returns a "${s.targetClass.name}" class instance`, function() {
            const actualInstance = s.method('a', 'b');

            should.exist(actualInstance);

            actualInstance.should.be.instanceOf(s.targetClass);
        });
    });

    const FIRST_PARAM_MISSING_ERROR = 'Missing "orderReference" parameter value in "OrderService" service SDK call';

    const invalidScenarios = [
        {
            method: (a, b) => subjectInstance.cancelOrderItemRequest(a, b),
            name: 'cancelOrderItemRequest'
        },
        {
            method: (a, b) => subjectInstance.uploadReplaceArtworkRequest(a, b),
            name: 'uploadReplaceArtworkRequest'
        }
    ];

    invalidScenarios.forEach(s => {
        it(`Then the "${s.name}" method with missing input throws and exception`, function() {
            (() =>s.method()).should.throw(FIRST_PARAM_MISSING_ERROR);
        });
    });

    invalidScenarios.forEach(s => {
        it(`Then the "${s.name}" method with missing second parameter throws and exception`, function() {
            (() => s.method('a')).should.throw('Missing "itemReference" parameter value in "OrderService" service SDK call');
        });
    });

    it('Then the "getOrderStatusByIdRequest" method with missing first parameter throws an expction', function() {
        (() => subjectInstance.getOrderStatusByIdRequest()).should.throw(FIRST_PARAM_MISSING_ERROR);
    });
});
