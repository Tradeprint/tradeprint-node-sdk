/* eslint-disable prefer-arrow-callback */

const chai = require('chai');
const should = chai.should();

const UploadReplaceArtwokRequest = require('../../../../lib/Requests/Orders/UploadReplaceArtwokRequest');
const RequestHandler = require('../../../../lib/RequestHandler');

const subject = new UploadReplaceArtwokRequest(new RequestHandler(), 'fakeOrderReference', 'fakeItemReference');

describe('When I set the properties of the upload/replace artwork request', function() {
    it('Then the file URLs are added to the payload', function() {
        subject.addFileUrl('URL_1');
        subject.addFileUrl('URL_2');

        should.exist(subject.payload.fileUrls);
        subject.payload.fileUrls.should.be.an('array');
        subject.payload.fileUrls.length.should.equal(2);

        should.exist(subject.payload.fileUrls[0]);
        should.exist(subject.payload.fileUrls[1]);

        subject.payload.fileUrls[0].should.equal('URL_1');
        subject.payload.fileUrls[1].should.equal('URL_2');
    });
});