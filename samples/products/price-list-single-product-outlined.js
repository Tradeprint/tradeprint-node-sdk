/*
 * Tradeprint API - Request Price List for Single Product (outlined for clarity)
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
        // Creates a Request object
        const request = await productService.priceListSingleProductRequest('PRODUCT_NAME');

        // Setting the properties on the PriceListSingleProductRequest (child of Request) object
        request.setEmailAddress('EMAIL_ADDRESS');
        request.setMarkup(10);
        request.setFormatCsv();

        // Execute the request and wait until we get ResponseResult
        const response = await request.execute();

        // Print out the ResponseResult object
        console.log(response);
    } catch (err) {
        // Print out the SdkError object
        console.error(err);
    }
})();
