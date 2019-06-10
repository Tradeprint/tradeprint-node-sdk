/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const FetchOrdersByReferenceRequest = require('../../../../lib/Requests/Orders/FetchOrdersByReferenceRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new FetchOrdersByReferenceRequest(new RequestHandler());

describe('When I set the properties of the fetch order by reference request', function() {
    it('Then the order references are added to the payload', function() {
        subject.addOrderReference('ORDER_REF_1');
        subject.addOrderReference('ORDER_REF_2');

        should.exist(subject.payload.orderReferences);
        subject.payload.orderReferences.should.be.an('array');
        subject.payload.orderReferences.length.should.equal(2);

        should.exist(subject.payload.orderReferences[0]);
        should.exist(subject.payload.orderReferences[1]);

        subject.payload.orderReferences[0].should.equal('ORDER_REF_1');
        subject.payload.orderReferences[1].should.equal('ORDER_REF_2');
    });
});