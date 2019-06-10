class Request {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} endpoint
     * @param {string} method
     */
    constructor(requestHandler, endpoint, method) {
        this.requestHandler = requestHandler;
        this.endpoint = endpoint;
        this.method = method;
    }

    /**
     * @param {Function} [callback] Optional callback function, returns a Promise if not passed
     * @return {Promise<ResponseResult>|VoidFunction} Returns a Promise if no callback passed
     * @throws {SdkError}
     */
    execute(callback) {
        if (!callback) return this.requestHandler.sendRequest(this);

        this.requestHandler.sendRequest(this)
            .then(response => callback(undefined, response))
            .catch(err => callback(err));
    }
}

Request.POST = 'POST';
Request.GET = 'GET';
Request.PUT = 'PUT';
Request.DELETE = 'DELETE';

module.exports = Request;
