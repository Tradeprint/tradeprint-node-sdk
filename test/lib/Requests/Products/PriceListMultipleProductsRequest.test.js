/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const PriceListsMultipleProductsRequest = require('../../../../lib/Requests/Products/PriceListsMultipleProductsRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new PriceListsMultipleProductsRequest(new RequestHandler());

describe('When I set the properties of the price list multiple products request', function() {
    it('Then the product names are added to the payload', function() {
        subject.addProductName('Deskpads');
        subject.addProductName('Business Cards');

        should.exist(subject.payload.productNames);
        subject.payload.productNames.should.be.an('array');
        subject.payload.productNames.length.should.equal(2);

        should.exist(subject.payload.productNames[0]);
        should.exist(subject.payload.productNames[1]);

        subject.payload.productNames[0].should.equal('Deskpads');
        subject.payload.productNames[1].should.equal('Business Cards');
    });
});
