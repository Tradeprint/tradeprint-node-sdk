const Sandbox = require('./Environments/Sandbox');
const Production = require('./Environments/Production');

const Environments = {
    Sandbox: new Sandbox(),
    Production: new Production()
};

module.exports = {
    Environments
};
