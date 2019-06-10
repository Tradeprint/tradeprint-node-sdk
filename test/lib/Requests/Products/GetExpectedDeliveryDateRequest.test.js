/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const GetExpectedDeliveryDateRequest = require('../../../../lib/Requests/Products/GetExpectedDeliveryDateRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new GetExpectedDeliveryDateRequest(new RequestHandler());

describe('When I set the properties of the get expected delivery date request', function() {
    it('Then the quantity is set in the payload', function() {
        subject.setQuantity(500);

        should.exist(subject.payload.quantity);

        subject.payload.quantity.should.equal(500);
    });

    it('Then the product ID is set in the payload', function() {
        subject.setProductId('PRODUCT_ID');

        should.exist(subject.payload.productId);

        subject.payload.productId.should.equal('PRODUCT_ID');
    });

    it('Then the service level is set in the payload', function() {
        subject.setServiceLevel('SERVICE_LEVEL');

        should.exist(subject.payload.serviceLevel);
        subject.payload.serviceLevel.should.equal('SERVICE_LEVEL');
    });

    it('Then the artwork service is set in the payload', function() {
        subject.setArtworkService('ARTWORK_SERVICE');

        should.exist(subject.payload.artworkService);
        subject.payload.artworkService.should.equal('ARTWORK_SERVICE');
    });

    it('Then the production data is set in the payload', function() {
        subject.setProductionData({
            'Sets': '3'
        });

        should.exist(subject.payload.productionData);
        should.exist(subject.payload.productionData.Sets);
        subject.payload.productionData.Sets.should.equal('3');
    });

    it('Then the postcode is set in the payload with no delivery address field', function() {
        subject.setDeliveryAddressPostcode('DD2 1TP');

        should.exist(subject.payload.deliveryAddress);
        should.exist(subject.payload.deliveryAddress.postcode);
        subject.payload.deliveryAddress.postcode.should.equal('DD2 1TP');
    });

    it('Then the postcode is set in the payload with a delivery address field', function() {
        subject.payload.deliveryAddress = {};

        subject.setDeliveryAddressPostcode('DD2 1TP');

        should.exist(subject.payload.deliveryAddress);
        should.exist(subject.payload.deliveryAddress.postcode);
        subject.payload.deliveryAddress.postcode.should.equal('DD2 1TP');
    });
});
