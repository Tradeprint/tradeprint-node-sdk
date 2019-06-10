/*
 * Tradeprint API - Fetch Orders by References
 * https://docs.sandbox.tradeprint.io/?version=latest#06cc541c-cd0e-48dc-864a-3d32c6cf173f
 *
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

(async() => {
    try {
        const response = await orderService
            .fetchOrdersByReferenceRequest()
            .addOrderReference('ORDER_REF_ONE')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
