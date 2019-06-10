const VERSION = 'v2';

class TradeprintEnvironment {
    constructor() {
        this.version = VERSION;
    }

    getUrl() {
        return `${this.baseUrl}/${this.version}`;
    }

    getName() {
        return this.constructor.name;
    }
}

module.exports = TradeprintEnvironment;