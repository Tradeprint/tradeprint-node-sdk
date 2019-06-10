/*
 * Tradeprint API - Request Price List for Single Product
 * https://docs.sandbox.tradeprint.io/?version=latest#80cd6377-af47-4ace-8e26-cff1884b1acf
 *
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

(async() => {
    try {
        const response = await productService.priceListSingleProductRequest('PRODUCT_NAME')
            .setEmailAddress('EMAIL_ADDRESS')
            .setMarkup(10)
            .setFormatCsv()
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
