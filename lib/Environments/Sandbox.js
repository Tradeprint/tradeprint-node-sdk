const TradeprintEnvironment = require('./TradeprintEnvironment');

class Sandbox extends TradeprintEnvironment {
    constructor() {
        super();

        this.baseUrl = 'https://sandbox.orders.tradeprint.io';
    }
}

module.exports = Sandbox;
