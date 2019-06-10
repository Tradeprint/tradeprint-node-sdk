const RequestHandler = require('../RequestHandler');

class ApiService {
    constructor() {
        this.requestHandler = RequestHandler.getHandler();
    }

    getRequestHandler() {
        return this.requestHandler;
    }

    verifyInput(service, params) {
        for (let paramName in params) {
            if (params.hasOwnProperty(paramName)) {
                const paramValue = params[paramName];

                if (!paramValue) {
                    throw new Error(`Missing "${paramName}" parameter value in "${service}" service SDK call`);
                }
            }
        }
    }
}

module.exports = ApiService;
