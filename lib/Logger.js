const VERSION = require('../package').version;
const LEAD_MSG = `Tradeprint SDK ${VERSION}`;

let debugging = false;

function error(message) {
    log(message, 'ERROR', console.error);
}

function debug(message) {
    if (debugging) log(message, 'DEBUG');
}

function log(message, type, logger = console.log) {
    if (typeof message === 'object') message = JSON.stringify(message);

    logger(`${LEAD_MSG} [${type}] ${message}`);
}

function setDebugging(debug) {
    debugging = debug;
}

module.exports = {
    setDebugging,
    error,
    debug
};
