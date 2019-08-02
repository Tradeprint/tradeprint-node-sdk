/**
 * Tradeprint API - Get Order Status by ID
 * https://docs.sandbox.tradeprint.io/?version=latest#ca75104b-eb43-40f8-9205-109dc2297327
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

(async() => {
    try {
        const response = await orderService
            .getOrderStatusByIdRequest('ORDER_REFERENCE')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
