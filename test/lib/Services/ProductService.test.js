/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const PriceListsMultipleProductsRequest = require('../../../lib/Requests/Products/PriceListsMultipleProductsRequest');
const PriceListSingleProductRequest = require('../../../lib/Requests/Products/PriceListSingleProductRequest');
const GetAllProductsAttributesRequest = require('../../../lib/Requests/Products/GetAllProductsAttributesRequest');
const GetSpecificProductAttributesRequest = require('../../../lib/Requests/Products/GetSpecificProductAttributesRequest');
const ProductQuantitiesRequest = require('../../../lib/Requests/Products/ProductQuantitiesRequest');
const GetExpectedDeliveryDateRequest = require('../../../lib/Requests/Products/GetExpectedDeliveryDateRequest');
const ProductService = require('../../../lib/Services/ProductService');

const subjectInstance = new ProductService();

describe('When I call the ProductService request creation methods', function() {
    const scenarios = [
        {
            method: () => subjectInstance.priceListsMultipleProductsRequest(),
            targetClass: PriceListsMultipleProductsRequest
        },
        {
            method: a => subjectInstance.priceListSingleProductRequest(a),
            targetClass: PriceListSingleProductRequest
        },
        {
            method: () => subjectInstance.getAllProductsAttributesRequest(),
            targetClass: GetAllProductsAttributesRequest
        },
        {
            method: a => subjectInstance.getSpecificProductAttributesRequest(a),
            targetClass: GetSpecificProductAttributesRequest
        },
        {
            method: () => subjectInstance.productQuantitiesRequest(),
            targetClass: ProductQuantitiesRequest
        },
        {
            method: () => subjectInstance.getExpectedDeliveryDateRequest(),
            targetClass: GetExpectedDeliveryDateRequest
        }
    ];

    scenarios.forEach(s => {
        it(`Then the method returns a "${s.targetClass.name}" class instance`, function() {
            const actualInstance = s.method('a', 'b');

            should.exist(actualInstance);

            actualInstance.should.be.instanceOf(s.targetClass);
        });
    });

    const invalidScenarios = [
        {
            method: a => subjectInstance.priceListSingleProductRequest(a),
            name: 'priceListSingleProductRequest'
        },
        {
            method: a => subjectInstance.getSpecificProductAttributesRequest(a),
            name: 'getSpecificProductAttributesRequest'
        }
    ];

    invalidScenarios.forEach(s => {
        it(`Then the "${s.name}" method with missing input throws and exception`, function() {
            (() =>s.method()).should.throw('Missing "productName" parameter value in "ProductService" service SDK call');
        });
    });
});
