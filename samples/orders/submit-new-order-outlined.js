/**
 * Tradeprint API - Submit New Order (outlined for clarity)
 * https://docs.sandbox.tradeprint.io/?version=latest#7df5f1d2-2e24-43fd-894a-a2c3e306e7cb
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

(async() => {
    try {
        // Creates a Request object
        const request = orderService.submitNewOrderRequest();

        // Setting the properties on the SubmitNewOrderRequest (child of Request) object
        request.setOrderReference('MY_REFERENCE_1');
        request.setCurrency('GBP');
        request.setBillingAddress({
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

        // Creates an OrderItem object
        const orderItem = request.addOrderItem();

        // Setting the properties of the OrderItem object
        orderItem.addFileUrl('FILE_URL_1');
        orderItem.setArtworkService('Just Print');
        orderItem.setServiceLevel('Saver');
        orderItem.setProductId('PRD-SRJ3LY4F');
        orderItem.setQuantity(500);
        orderItem.setQuantityUpgrade(500, 10000);
        orderItem.setProductionData({
            "Sides Printed": "Double Sided",
            "Paper Type": "100gsm Premium Smooth White Paper",
            "Sets": "1"
        });
        orderItem.setExtraData({
            comments: 'This is the extra data comments',
            partnerItemId: 'fakeCompany123',
            merchandisingProductName: 'My Special Product',
            referenceLabel: 'CUSTOMER_LABEL',
            purchaseOrder: 'PURCHASE_ORDER'
        });
        orderItem.setPartnerContactDetails({
            firstName: 'John',
            lastName: 'Smith',
            email: 'john@fakecompany.co.uk',
            phone: '0123456879',
            company: 'Fake Company Ltd'
        });
        orderItem.setDeliveryAddress({
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

        // Execute the request and wait until we get ResponseResult
        const response = await request.execute();

        // Print out the ResponseResult object
        console.log(response);
    } catch (err) {
        // Print out the SdkError object
        console.error(err);
    }
})();
