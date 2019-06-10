/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const OrderItem = require('../../lib/OrderItem');

const subject = new OrderItem();

describe('When I set the properties of the order item', function() {
    it('Then the product ID is set', function() {
        subject.setProductId('PRODUCT_ID');

        should.exist(subject.productId);

        subject.productId.should.equal('PRODUCT_ID');
    });

    it('Then the service level is set', function() {
        subject.setServiceLevel('FAKE_LEVEL');

        should.exist(subject.productId);

        subject.serviceLevel.should.equal('FAKE_LEVEL');
    });

    it('Then the artwork service is set', function() {
        subject.setArtworkService('FAKE_SERVICE');

        should.exist(subject.productId);

        subject.artworkService.should.equal('FAKE_SERVICE');
    });

    it('Then the without artwork flag is set', function() {
        subject.setWithoutArtwork(true);

        should.exist(subject.productId);

        subject.withoutArtwork.should.equal(true);
    });

    it('Then the quantity is set', function() {
        subject.setQuantity(500);

        should.exist(subject.quantity);

        subject.quantity.should.equal(500);
    });

    it('Then the order reference is set in the payload', function() {
        subject.setItemReference('FAKE_ITEM_REFERENCE');

        should.exist(subject.itemReference);
        subject.itemReference.should.equal('FAKE_ITEM_REFERENCE');
    });

    it('Then the delivery address is set', function() {
        subject.setDeliveryAddress({
            town: 'FAKE_TOWN'
        });

        should.exist(subject.deliveryAddress);
        should.exist(subject.deliveryAddress.town);
        subject.deliveryAddress.town.should.equal('FAKE_TOWN');
    });

    it('Then the partner contact details are set', function() {
        subject.setPartnerContactDetails({
            company: 'FAKE_COMPANY'
        });

        should.exist(subject.partnerContactDetails);
        should.exist(subject.partnerContactDetails.company);
        subject.partnerContactDetails.company.should.equal('FAKE_COMPANY');
    });

    it('Then the production data is set', function() {
        subject.setProductionData({
            'Paper Type': '400gsm Art Board Silk Finish'
        });

        should.exist(subject.productionData);
        should.exist(subject.productionData['Paper Type']);
        subject.productionData['Paper Type'].should.equal('400gsm Art Board Silk Finish');
    });

    it('Then the extra data is set', function() {
        subject.setExtraData({
            merchandisingProductName: 'My Folded Flyer'
        });

        should.exist(subject.partnerContactDetails);
        should.exist(subject.extraData.merchandisingProductName);
        subject.extraData.merchandisingProductName.should.equal('My Folded Flyer');
    });

    it('Then the file URLs are set', function() {
        subject.addFileUrl('FAKE_URL_1');
        subject.addFileUrl('FAKE_URL_2');

        should.exist(subject.fileUrls);
        subject.fileUrls.should.be.an('array');
        subject.fileUrls.length.should.equal(2);

        should.exist(subject.fileUrls[0]);
        should.exist(subject.fileUrls[1]);

        subject.fileUrls[0].should.equal('FAKE_URL_1');
        subject.fileUrls[1].should.equal('FAKE_URL_2');
    });

    it('Then the quantity upgrade values are set', function() {
        subject.setQuantityUpgrade(300, 400);

        should.exist(subject.quantityUpgrade);
        should.exist(subject.quantityUpgrade.maxQuantity);
        should.exist(subject.quantityUpgrade.maxPrice);
        subject.quantityUpgrade.maxQuantity.should.equal(300);
        subject.quantityUpgrade.maxPrice.should.equal(400);
    });
});