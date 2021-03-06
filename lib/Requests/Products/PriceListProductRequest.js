const moment = require('moment');

const PostRequest = require('../PostRequest');

const FORMAT_CSV = 'csv';
const FORMAT_JSON = 'json';

class PriceListProductRequest extends PostRequest {
    /**
     * @param {RequestHandler} requestHandler
     * @param {string} endpoint
     */
    constructor(requestHandler, endpoint) {
        super(requestHandler, endpoint);
    }

    /**
     * @param {string} email
     * @return {PriceListProductRequest}
     */
    setEmailAddress(email) {
        this.payload.email = email;

        return this;
    }

    /**
     * @param {number} markup
     * @return {PriceListProductRequest}
     */
    setMarkup(markup) {
        this.payload.markup = markup;

        return this;
    }

    /**
     * @return {PriceListProductRequest}
     */
    setFormatCsv() {
        this.payload.format = FORMAT_CSV;

        return this;
    }

    /**
     * @return {PriceListProductRequest}
     */
    setFormatJSON() {
        this.payload.format = FORMAT_JSON;

        return this;
    }

    /**
     * @param {Date} fromDate
     * @return {PriceListProductRequest}
     */
    setFromDate(fromDate) {
        if (!(fromDate instanceof Date)) {
            throw new Error('The "fromDate" parameter must be a Date type');
        }

        this.payload.fromDate = moment(fromDate).format('DD/MM/YYYY');
    }
}

module.exports = PriceListProductRequest;
