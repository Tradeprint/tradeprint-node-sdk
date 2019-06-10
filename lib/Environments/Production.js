const TradeprintEnvironment = require('./TradeprintEnvironment');

class Production extends TradeprintEnvironment {
    constructor() {
        super();

        this.baseUrl = 'https://orders.tradeprint.io';
    }
}

module.exports = Production;
