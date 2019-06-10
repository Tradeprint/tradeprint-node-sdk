/*
 * Tradeprint API - Request Product Quantities
 * https://docs.sandbox.tradeprint.io/?version=latest#9f8758a3-da77-4fd5-b307-9df28e5e9b4b
 *
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

(async() => {
    try {
        const response = await productService.productQuantitiesRequest()
            .setProductId('PRD-SRJ3LY4F')
            .setServiceLevel('Saver')
            .setProductionData({
                "Sides Printed": "Double Sided",
                "Paper Type": "100gsm Premium Smooth White Paper",
                "Sets": "1"
            })
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
