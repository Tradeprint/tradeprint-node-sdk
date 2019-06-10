/* eslint-disable prefer-arrow-callback */

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');

const should = chai.should();
chai.use(sinonChai);
sinonStubPromise(sinon);

const Request = require('../../../lib/Requests/Request');
const RequestHandler = require('../../../lib/RequestHandler');

describe('When I creata a request object', function() {
    let sendRequestFake;
    let requestHandlerInstance;

    beforeEach(function() {
        requestHandlerInstance = new RequestHandler();
    });

    afterEach(function() {
        sinon.restore();
    });

    it('Then I can execute it as a resolved promise', function() {
        sendRequestFake = sinon.fake.resolves({ sample: 'response' });
        sinon.replace(requestHandlerInstance, 'sendRequest', sendRequestFake);

        const subject = new Request(requestHandlerInstance, 'fakeEndpoint', 'POST');

        return subject.execute()
            .then(result => {
                should.exist(result);
                should.exist(result.sample);

                result.sample.should.equal('response');
            });
    });

    it('Then I can execute it as a rejected promise', function() {
        sendRequestFake = sinon.fake.rejects('errorDetails');
        sinon.replace(requestHandlerInstance, 'sendRequest', sendRequestFake);

        const subject = new Request(requestHandlerInstance, 'fakeEndpoint', 'POST');

        return subject.execute()
            .catch(result => {
                should.exist(result);
                should.exist(result.message);

                result.message.should.equal('errorDetails');
            });
    });

    it('Then I can execute with a success callback', function(done) {
        sendRequestFake = sinon.fake.resolves({ sample: 'response' });
        sinon.replace(requestHandlerInstance, 'sendRequest', sendRequestFake);

        const subject = new Request(requestHandlerInstance, 'fakeEndpoint', 'POST');

        subject.execute((err, result) => {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.sample);

            result.sample.should.equal('response');

            done();
        });
    });

    it('Then I can execute with a failed callback', function(done) {
        sendRequestFake = sinon.fake.rejects('errorDetails');
        sinon.replace(requestHandlerInstance, 'sendRequest', sendRequestFake);

        const subject = new Request(requestHandlerInstance, 'fakeEndpoint', 'POST');

        subject.execute(err => {
            should.exist(err);
            should.exist(err.message);

            err.message.should.equal('errorDetails');

            done();
        });
    });
});
