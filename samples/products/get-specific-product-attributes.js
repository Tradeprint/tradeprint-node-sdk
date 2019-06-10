/*
 * Tradeprint API - Get Attributes for Specific Product
 * https://docs.sandbox.tradeprint.io/?version=latest#99ef2585-9784-41b7-a086-2b174cc001b8
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
            .getSpecificProductAttributesRequest('PRODUCT_NAME')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
