/**
 * Tradeprint API - Cancel an Order Item
 * https://docs.sandbox.tradeprint.io/?version=latest#4dc388f6-26b4-4141-b71e-0885c3532dd0
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

(async() => {
    try {
        const response = await orderService
            .cancelOrderItemRequest('ORDER_REF', 'ITEM_REF')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
