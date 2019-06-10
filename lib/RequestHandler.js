const rp = require('request-promise-any');

const Logger = require('./Logger');
const SdkError = require('./SdkError');
const ResponseResult = require('./ResponseResult');

const CONFIGURATION = 'Configuration';
const AUTHENTICATION = 'Authentication';
const AUTH_TOKEN_TIMEOUT_FOUR_HOURS = 14400000; // Half of the 8 hour token expiry time

/**
 * @type {RequestHandler}
 */
let _handler;

/**
 * @type {string}
 */
let username;

/**
 *
 * @type {string}
 */
let password;

/**
 * @type {TradeprintEnvironment}
 */
let environment;

class RequestHandler {
    constructor(tokenTimeout = AUTH_TOKEN_TIMEOUT_FOUR_HOURS) {
        this.token = null;
        this.tokenTimestamp = null;
        this.tokenTimeout = tokenTimeout;
    }

    static getHandler() {
        if (!_handler) _handler = new RequestHandler();

        return _handler;
    }

    static setCredentials(user, pass) {
        username = user;
        password = pass;
    }

    static setEnvironment(env) {
        environment = env;
    }

    /**
     * @param {string} sdkMethod
     * @param {string|Object} message
     * @param {string|Object} [response]
     * @return {Promise<SdkError>}
     */
    static sdkReject(sdkMethod, message, response = {}) {
        const formattedMessage = typeof message === 'string' ? message : JSON.stringify(message);

        let jsonResponse = response;

        if (typeof jsonResponse !== 'object') {
            try {
                jsonResponse = JSON.parse(response);
            } catch (e) {
                Logger.error(`Failed parsing "${response}" response`);
                Logger.error(e);
            }
        }

        const error = new SdkError(sdkMethod, formattedMessage, jsonResponse);

        return Promise.reject(error);
    }

    /**
     * @param {Request} request
     * @return {Promise<ResponseResult>}
     * @throws {SdkError}
     */
    sendRequest(request) {
        const sdkMethod = request.constructor.name;
        const instanceContext = this;

        function verifyConfig() {
            if (!environment) {
                return RequestHandler.sdkReject(CONFIGURATION, 'Please configure your SDK environment (Sandbox or Production)');
            }

            if (!username || !password) {
                return RequestHandler.sdkReject(CONFIGURATION, 'Please configure your SDK credentials');
            }

            return Promise.resolve();
        }

        function verifyLogin() {
            if (!instanceContext.token || !instanceContext.tokenTimestamp) {
                return loginToApi();
            }

            if (new Date() - instanceContext.tokenTimestamp > instanceContext.tokenTimeout) {
                return loginToApi();
            }

            return Promise.resolve();
        }

        function loginToApi() {
            const authRequest = {
                uri: `${environment.getUrl()}/login`,
                json: {
                    username,
                    password
                }
            };

            Logger.debug(`Logging in to "${environment.getName()}" environment`);

            return rp.post(authRequest)
                .catch(err => {
                    Logger.error('Authentication error');
                    Logger.error(err.message);

                    return RequestHandler.sdkReject(AUTHENTICATION, err.message, err.error);
                })
                .then(authResponse => {
                    if (!authResponse.success) {
                        return RequestHandler.sdkReject(AUTHENTICATION, 'Authentication failed', authResponse);
                    }

                    instanceContext.token = authResponse.result.token;
                    instanceContext.tokenTimestamp = new Date();

                    Logger.debug(`Successfully obtained "${environment.getName()}" environment token`);
                });
        }

        function callEndpoint() {
            const { method, endpoint, payload } = request;

            const uri = `${environment.getUrl()}/${endpoint}`;

            const requestPayload = {
                method,
                uri,
                auth: {
                    bearer: instanceContext.token
                }
            };

            if (payload) requestPayload.json = payload;

            Logger.debug(`Calling "${sdkMethod}" method`);

            const requestMethod = rp[method.toString().toLowerCase()];

            return requestMethod(requestPayload)
                .catch(err => {
                    Logger.error(`Calling "${sdkMethod}" method failed`);
                    Logger.error(err.message);

                    return RequestHandler.sdkReject(sdkMethod, err.message, err.error);
                });
        }

        function processResponse(response) {
            let jsonResponse = response;

            if (typeof response !== 'object') {
                try {
                    jsonResponse = JSON.parse(response);
                } catch(e) {
                    const msg = `Failed parsing "${response}" response with "${JSON.stringify(e)}" error`;

                    return RequestHandler.sdkReject(sdkMethod, msg, response);
                }
            }

            if (jsonResponse.success) {
                Logger.debug(`"${sdkMethod}" method call successful`);

                return new ResponseResult(jsonResponse.result);
            }

            return RequestHandler.sdkReject(sdkMethod, `Calling "${sdkMethod}" method failed`, jsonResponse);
        }

        return verifyConfig()
            .then(verifyLogin)
            .then(callEndpoint)
            .then(processResponse);
    }
}

module.exports = RequestHandler;
