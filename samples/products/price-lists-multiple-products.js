/**
 * Tradeprint API - Request Price Lists for Multiple Products
 * https://docs.sandbox.tradeprint.io/?version=latest#2206363e-3668-4c2e-b1ec-e9523416916a
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

(async() => {
    try {
        const response = await productService.priceListsMultipleProductsRequest()
            .setEmailAddress('EMAIL_ADDRESS')
            .setMarkup(10)
            .setFormatJSON()
            .addProductName('PRODUCT_NAME')
            .setFromDate(new Date('August 19, 1975 23:15:30'))
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
