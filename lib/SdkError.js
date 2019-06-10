class SdkError extends Error {
    constructor(sdkMethod, message, response, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SdkError);
        }

        this.name = 'SdkError';
        this.sdkMethod = sdkMethod;
        this.message = message;
        this.response = response;
    }
}

module.exports = SdkError;
