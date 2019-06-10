/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const SubmitValidateOrderRequest = require('../../../../lib/Requests/Orders/SubmitValidateOrderRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new SubmitValidateOrderRequest(new RequestHandler(), 'fakeEndpoint');

describe('When I set the properties of the submit/validate order request', function() {
    it('Then the custom currency is set in the payload', function() {
        subject.setCurrency('FAKE_CURRENCY');

        should.exist(subject.payload.currency);

        subject.payload.currency.should.equal('FAKE_CURRENCY');
    });

    it('Then the default is set in the payload', function() {
        subject.setCurrency();

        should.exist(subject.payload.currency);

        subject.payload.currency.should.equal('GBP');
    });

    it('Then the order reference is set in the payload', function() {
        subject.setOrderReference('FAKE_ORDER_REFERENCE');

        should.exist(subject.payload.orderReference);
        subject.payload.orderReference.should.equal('FAKE_ORDER_REFERENCE');
    });

    it('Then the billing address is set in the payload', function() {
        subject.setBillingAddress({
            town: 'FAKE_TOWN'
        });

        should.exist(subject.payload.billingAddress);
        should.exist(subject.payload.billingAddress.town);
        subject.payload.billingAddress.town.should.equal('FAKE_TOWN');
    });

    it('Then the order items are added to the payload', function() {
        subject.addOrderItem()
            .setQuantity(123)
            .setQuantityUpgrade(400, 10000);

        subject.addOrderItem()
            .setQuantity(321)
            .setQuantityUpgrade(500, 20000);

        should.exist(subject.payload.orderItems);
        subject.payload.orderItems.should.be.an('array');
        subject.payload.orderItems.length.should.equal(2);

        should.exist(subject.payload.orderItems[0]);
        should.exist(subject.payload.orderItems[1]);

        should.exist(subject.payload.orderItems[0].quantity);
        should.exist(subject.payload.orderItems[1].quantity);
        should.exist(subject.payload.orderItems[0].quantityUpgrade);
        should.exist(subject.payload.orderItems[1].quantityUpgrade);
        should.exist(subject.payload.orderItems[0].quantityUpgrade.maxPrice);
        should.exist(subject.payload.orderItems[1].quantityUpgrade.maxPrice);
        should.exist(subject.payload.orderItems[0].quantityUpgrade.maxQuantity);
        should.exist(subject.payload.orderItems[1].quantityUpgrade.maxQuantity);

        subject.payload.orderItems[0].quantity.should.equal(123);
        subject.payload.orderItems[1].quantity.should.equal(321);

        subject.payload.orderItems[0].quantityUpgrade.maxPrice.should.equal(10000);
        subject.payload.orderItems[1].quantityUpgrade.maxPrice.should.equal(20000);

        subject.payload.orderItems[0].quantityUpgrade.maxQuantity.should.equal(400);
        subject.payload.orderItems[1].quantityUpgrade.maxQuantity.should.equal(500);
    });
});