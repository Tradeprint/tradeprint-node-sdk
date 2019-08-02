/**
 * Tradeprint API - Upload or Replace Artwork
 * https://docs.sandbox.tradeprint.io/?version=latest#03d1f33a-53d2-43f0-b45a-8b44f600a270
 */
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const orderService = new SDK.OrderService();

(async() => {
    try {
        const response = await orderService
            .uploadReplaceArtworkRequest('ORDER_REF', 'ITEM_REF')
            .addFileUrl('FILE_URL_1')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
