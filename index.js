const RequestHandler = require('./lib/RequestHandler');
const TradeprintEnvironment = require('./lib/Environments/TradeprintEnvironment');
const OrderService = require('./lib/Services/OrderService');
const ProductService = require('./lib/Services/ProductService');

const Logger = require('./lib/Logger');
const Config = require('./lib/Config');

/**
 * @param {string} username Tradeprint API Username
 * @param {string} password Tradeprint API Password
 */
function setCredentials(username, password) {
    let valid = false;

    if (typeof username === 'string' && typeof password === 'string') {
        if (username.length > 0 && password.length > 0) valid = true;
    }

    if (!valid) throw new Error('Both "username" and "password" parameters must be valid credential strings');

    RequestHandler.setCredentials(username, password);
}

/**
 * @param {TradeprintEnvironment} environment Environments.Sandbox or Environments.Production
 */
function setEnvironment(environment) {
    if (!(environment instanceof TradeprintEnvironment)) {
        throw new Error(`Input parameter "${environment}" must be a "TradeprintEnvironment" type`);
    }

    RequestHandler.setEnvironment(environment);
}

/**
 * @param {boolean} debugging Enable or disable debugging messages
 */
function setDebugging(debugging) {
    if (typeof debugging !== 'boolean') {
        throw new Error(`Input parameter "${debugging}" must be a boolean value`);
    }

    Logger.setDebugging(debugging);
}

module.exports = {
    OrderService,
    ProductService,
    setCredentials,
    setEnvironment,
    setDebugging,
    Environments: Config.Environments
};
