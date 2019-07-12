/*
 * Tradeprint API - Retry Paymet
 * https://docs.sandbox.tradeprint.io/?version=latest#a4c34bda-065c-4d94-8125-db51304d7b7f7
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
            .retryPaymentRequest('ORDER_REFERENCE')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
