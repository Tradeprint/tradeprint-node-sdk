const Request = require('../Request');

class UploadReplaceArtwokRequest extends Request {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} orderReference
     * @param {string} itemReference
     */
    constructor(requestHandler, orderReference, itemReference) {
        const endpoint = `orders/${orderReference}/orderItems/${itemReference}/fileUrls`;

        super(requestHandler, endpoint, Request.PUT);

        this.payload = {};
        this.payload.fileUrls = [];
    }

    /**
     * @param {string} fileUrl
     * @return {UploadReplaceArtwokRequest}
     */
    addFileUrl(fileUrl) {
        this.payload.fileUrls.push(fileUrl);

        return this;
    }
}

module.exports = UploadReplaceArtwokRequest;
