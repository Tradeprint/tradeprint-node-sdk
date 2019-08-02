/**
 * Tradeprint API - Get Expected Delivery Date
 * https://docs.sandbox.tradeprint.io/?version=latest#1b94aa3e-c028-47b0-8502-04035a1f9490
 *
 * Promise-based function execution.
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

const response = productService.getExpectedDeliveryDateRequest()
    .setProductId('PRD-SRJ3LY4F')
    .setServiceLevel('Saver')
    .setArtworkService('Just Print')
    .setProductionData({
        'Sides Printed': 'Double Sided',
        'Paper Type': '100gsm Premium Smooth White Paper',
        'Sets': '1'
    })
    .setQuantity(500)
    .setDeliveryAddressPostcode('POST CODE');   // Use a real postcode instead

response.execute()
    .then(response => {
        // Should return a RespnseResult object
        console.log(response);
    })
    .catch(err => {
        // Will return an SdkError object
        console.error(err);
    });
