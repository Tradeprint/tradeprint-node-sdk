/**
 * Tradeprint API - Submit New Order
 * https://docs.sandbox.tradeprint.io/?version=latest#7df5f1d2-2e24-43fd-894a-a2c3e306e7cb
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

(async() => {
    try {
        const request = orderService.submitNewOrderRequest()
            .setOrderReference('MY_REFERENCE_1')
            .setCurrency('GBP')
            .setBillingAddress({
                firstName: 'John',
                lastName: 'Smith',
                streetName: '1 Fake Street',
                additionalStreetInfo: 'Fake Technology Park',
                postalCode: 'DD2 1TP',
                city: 'Faketown',
                country: 'GB',
                company: 'Fake Company Ltd',
                email: 'john@fakecompany.co.uk',
                phone: '0123456879',
                mobile: '0987654321'
            });

        request.addOrderItem()
            .addFileUrl('FILE_URL_1')
            .setArtworkService('Just Print')
            .setServiceLevel('Saver')
            .setProductId('PRD-SRJ3LY4F')
            .setQuantity(500)
            .setQuantityUpgrade(500, 10000)
            .setProductionData({
                "Sides Printed": "Double Sided",
                "Paper Type": "100gsm Premium Smooth White Paper",
                "Sets": "1"
            })
            .setExtraData({
                comments: 'This is the extra data comments',
                partnerItemId: 'fakeCompany123',
                merchandisingProductName: 'My Special Product',
                referenceLabel: 'CUSTOMER_LABEL',
                purchaseOrder: 'PURCHASE_ORDER'
            })
            .setPartnerContactDetails({
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@fakecompany.co.uk',
                phone: '0123456879',
                company: 'Fake Company Ltd'
            })
            .setDeliveryAddress({
                company: 'Fake Company Ltd',
                firstName: 'John',
                lastName: 'Smith',
                add1: '1 Fake Street',
                add2: 'Fake Technology Park',
                town: 'Faketown',
                postcode: 'DD2 1TP',
                country: 'GB',
                contactPhone: '0123456879',
                deliveryComments: 'Please leave at front door'
            });

        const response = await request.execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
