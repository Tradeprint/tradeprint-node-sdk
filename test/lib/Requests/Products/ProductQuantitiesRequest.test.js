/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const ProductQuantitiesRequest = require('../../../../lib/Requests/Products/ProductQuantitiesRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new ProductQuantitiesRequest(new RequestHandler());

describe('When I set the properties of the product quantities request', function() {
    it('Then the product ID is set in the payload', function() {
        subject.setProductId('TEST_PRODUCT');

        should.exist(subject.payload.productId);

        subject.payload.productId.should.equal('TEST_PRODUCT');
    });

    it('Then the service level is set in the payload', function() {
        subject.setServiceLevel('SERVICE_LEVEL');

        should.exist(subject.payload.serviceLevel);

        subject.payload.serviceLevel.should.equal('SERVICE_LEVEL');
    });

    it('Then the format is set in the payload', function() {
        subject.setProductionData({
            'Sets': '5'
        });

        should.exist(subject.payload.productionData);
        should.exist(subject.payload.productionData.Sets);
        subject.payload.productionData.Sets.should.equal('5');
    });
});
