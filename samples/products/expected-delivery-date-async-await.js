/*
 * Tradeprint API - Get Expected Delivery Date
 * https://docs.sandbox.tradeprint.io/?version=latest#1b94aa3e-c028-47b0-8502-04035a1f9490
 *
 * Preferred way of calling the SDK functions.
 *
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

(async() => {
    try {
        // Should return a RespnseResult object
        const response = await productService.getExpectedDeliveryDateRequest()
            .setProductId('PRD-SRJ3LY4F')
            .setServiceLevel('Saver')
            .setArtworkService('Just Print')
            .setProductionData({
                'Sides Printed': 'Double Sided',
                'Paper Type': '100gsm Premium Smooth White Paper',
                'Sets': '1'
            })
            .setQuantity(500)
            .setDeliveryAddressPostcode('POST CODE')   // Use a real postcode instead
            .execute();

        console.log(response);
    } catch (err) {
        // Will return an SdkError object
        console.error(err);
    }
})();
