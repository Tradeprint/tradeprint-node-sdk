const PostRequest = require('../PostRequest');

const FORMAT_CSV = 'csv';
const FORMAT_JSON = 'json';

class PriceListSingleProductRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} endpoint
     */
    constructor(requestHandler, endpoint) {
        super(requestHandler, endpoint);
    }

    /**
     * @param {string} email
     * @return {PriceListSingleProductRequest}
     */
    setEmailAddress(email) {
        this.payload.email = email;

        return this;
    }

    /**
     * @param {number} markup
     * @return {PriceListSingleProductRequest}
     */
    setMarkup(markup) {
        this.payload.markup = markup;

        return this;
    }

    /**
     * @return {PriceListSingleProductRequest}
     */
    setFormatCsv() {
        this.payload.format = FORMAT_CSV;

        return this;
    }

    /**
     * @return {PriceListSingleProductRequest}
     */
    setFormatJSON() {
        this.payload.format = FORMAT_JSON;

        return this;
    }
}

module.exports = PriceListSingleProductRequest;
