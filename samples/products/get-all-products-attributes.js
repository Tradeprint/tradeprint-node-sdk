/*
 * Tradeprint API - Get All Products Attributes
 * https://docs.sandbox.tradeprint.io/?version=latest#6ebfb248-8ef8-467a-9484-83b40114b26b
 *
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

(async() => {
    try {
        const response = await productService
            .getAllProductsAttributesRequest()
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
