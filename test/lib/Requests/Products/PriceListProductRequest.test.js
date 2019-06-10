/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const PriceListProductRequest = require('../../../../lib/Requests/Products/PriceListProductRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new PriceListProductRequest(new RequestHandler(), 'fakeEndpoint');

describe('When I set the properties of the price list product request', function() {
    it('Then the markup is set in the payload', function() {
        subject.setMarkup(10);

        should.exist(subject.payload.markup);

        subject.payload.markup.should.equal(10);
    });

    it('Then the email is set in the payload', function() {
        subject.setEmailAddress('test@test.com');

        should.exist(subject.payload.email);

        subject.payload.email.should.equal('test@test.com');
    });

    it('Then the format is set to "csv" in the payload', function() {
        subject.setFormatCsv();

        should.exist(subject.payload.format);
        subject.payload.format.should.equal('csv');
    });

    it('Then the format is set to "json" in the payload', function() {
        subject.setFormatJSON();

        should.exist(subject.payload.format);
        subject.payload.format.should.equal('json');
    });
});
