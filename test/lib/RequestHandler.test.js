/* eslint-disable prefer-arrow-callback */

const rp = require('request-promise-any');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');

const should = chai.should();
chai.use(sinonChai);
sinonStubPromise(sinon);

const RequestHandler = require('../../lib/RequestHandler');
const Request = require('../../lib/Requests/Request');
const Sandbox = require('../../lib/Environments/Sandbox');

class TestRequest extends Request {
    constructor(requestHandler, endpoint, method, payload) {
        super(requestHandler, endpoint, method);

        this.payload = payload;
    }
}

describe('When I access the request handler', function() {
    it('Then I get a singleton instance of the request handler', function() {
        const instanceRefOne = RequestHandler.getHandler();

        should.exist(instanceRefOne);

        instanceRefOne.should.be.instanceOf(RequestHandler);

        const instanceRefTwo = RequestHandler.getHandler();

        should.exist(instanceRefOne);

        instanceRefTwo.should.eql(instanceRefOne);
        instanceRefTwo.should.equal(instanceRefOne);
    });

    describe('And I send a request', function() {
        let rpPostStub;
        let rpPutStub;
        let rpGetStub;
        let shortTokenTimeoutInstance;
        let testPutRequest;

        beforeEach(function() {
            shortTokenTimeoutInstance = new RequestHandler();

            const testPayload = {
                field: 'value'
            };

            testPutRequest = new TestRequest(shortTokenTimeoutInstance, 'fakeEndpoint', 'PUT', testPayload);

            rpPostStub = sinon.stub(rp, 'post');
            rpPutStub = sinon.stub(rp, 'put');
            rpGetStub = sinon.stub(rp, 'get');
        });

        afterEach(function() {
            rp.post.restore();
            rp.put.restore();
            rp.get.restore();
        });

        it('Then I get an environment configuration error', function() {
            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);

                    err.message.should.equal('Please configure your SDK environment (Sandbox or Production)');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('Configuration');
                });
        });

        it('Then I get a credentials configuration error', function() {
            RequestHandler.setEnvironment(new Sandbox());

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);

                    err.message.should.equal('Please configure your SDK credentials');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('Configuration');
                });
        });

        it('Then I get valid authentication and call responses for a PUT request', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpPutStub.resolves({
                success: true,
                result: {
                    all: 'ok'
                }
            });

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .then(responseResult => {
                    should.exist(responseResult);
                    should.exist(responseResult.all);

                    responseResult.all.should.equal('ok');
                });
        });

        it('Then I get valid authentication and call responses for a GET request', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpGetStub.resolves({
                success: true,
                result: {
                    all: 'ok'
                }
            });

            const testGetRequest = new TestRequest(shortTokenTimeoutInstance, 'fakeEndpoint', 'GET');

            return shortTokenTimeoutInstance.sendRequest(testGetRequest)
                .then(responseResult => {
                    should.exist(responseResult);
                    should.exist(responseResult.all);

                    responseResult.all.should.equal('ok');
                });
        });

        it('Then I get valid authentication once and call responses for a GET request twice', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpGetStub.resolves({
                success: true,
                result: {
                    all: 'ok'
                }
            });

            const testGetRequest = new TestRequest(shortTokenTimeoutInstance, 'fakeEndpoint', 'GET');

            return shortTokenTimeoutInstance.sendRequest(testGetRequest)
                .then(responseResult => {
                    should.exist(responseResult);
                    should.exist(responseResult.all);

                    responseResult.all.should.equal('ok');

                    return shortTokenTimeoutInstance.sendRequest(testGetRequest);
                })
                .then(responseResult => {
                    should.exist(responseResult);
                    should.exist(responseResult.all);

                    responseResult.all.should.equal('ok');

                    const authCalls = rpPostStub.getCalls();

                    should.exist(authCalls);
                    authCalls.length.should.equal(1);

                    const getCalls = rpGetStub.getCalls();

                    should.exist(getCalls);
                    getCalls.length.should.equal(2);
                });
        });

        it('Then I get valid authentication once and call responses for a GET request after a token timeout', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpGetStub.resolves({
                success: true,
                result: {
                    all: 'ok'
                }
            });

            shortTokenTimeoutInstance = new RequestHandler(1000);

            const testGetRequest = new TestRequest(shortTokenTimeoutInstance, 'fakeEndpoint', 'GET');

            return shortTokenTimeoutInstance.sendRequest(testGetRequest)
                .then(responseResult => {
                    should.exist(responseResult);
                    should.exist(responseResult.all);

                    responseResult.all.should.equal('ok');

                    return new Promise(resolve => {
                        setTimeout(resolve, 3000);
                    });
                })
                .then(() => shortTokenTimeoutInstance.sendRequest(testGetRequest))
                .then(responseResult => {
                    should.exist(responseResult);
                    should.exist(responseResult.all);

                    responseResult.all.should.equal('ok');

                    const authCalls = rpPostStub.getCalls();

                    should.exist(authCalls);
                    authCalls.length.should.equal(2);

                    const getCalls = rpGetStub.getCalls();

                    should.exist(getCalls);
                    getCalls.length.should.equal(2);
                });
        });

        it('Then I get valid authentication and invalid JSON object call response as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpPutStub.resolves({
                success: false
            });

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);
                    should.exist(err.response);
                    should.exist(err.response.success);

                    err.message.should.equal('Calling "TestRequest" method failed');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('TestRequest');
                    err.response.success.should.equal(false);
                });
        });

        it('Then I get valid authentication and invalid JSON string call response as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpPutStub.resolves('{ "success": false }');

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);
                    should.exist(err.response);
                    should.exist(err.response.success);

                    err.message.should.equal('Calling "TestRequest" method failed');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('TestRequest');
                    err.response.success.should.equal(false);
                });
        });

        it('Then I get valid authentication and invalid non-JSON string call response as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpPutStub.resolves('NONSENSE');

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);
                    should.exist(err.response);

                    err.message.should.equal('Failed parsing "NONSENSE" response with "{}" error');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('TestRequest');
                    err.response.should.equal('NONSENSE');
                });
        });

        it('Then I get valid authentication and an error response as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpPutStub.rejects({
                message: '404 - "{\\"success\\":false,\\"errorMessage\\":\\"Order not found\\",\\"errorDetails\\":{}}"',
                error: '{"success":false,"errorMessage":"Order not found","errorDetails":{}}'
            });

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);

                    err.message.should.equal('404 - "{\\"success\\":false,\\"errorMessage\\":\\"Order not found\\",\\"errorDetails\\":{}}"');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('TestRequest');
                });
        });

        it('Then I get valid authentication and an error response with object message as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('test-user', 'test-pass');

            rpPostStub.resolves({
                success: true,
                result: {
                    token: 'TOKEN'
                }
            });

            rpPutStub.rejects({
                message: { unlikely: 'errorMessage' },
                error: '{"success":false,"errorMessage":"Order not found","errorDetails":{}}'
            });

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);

                    err.message.should.equal('{"unlikely":"errorMessage"}');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('TestRequest');
                });
        });

        it('Then I get an invalid authentication response with 200 code as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('invalid-user', 'invalid-pass');

            rpPostStub.resolves({
                success: false
            });

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);
                    should.exist(err.response);
                    should.exist(err.response.success);

                    err.message.should.equal('Authentication failed');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('Authentication');
                    err.response.success.should.equal(false);
                });
        });

        it('Then I get an invalid authentication response with 401 code as an SDK error', function() {
            RequestHandler.setEnvironment(new Sandbox());
            RequestHandler.setCredentials('invalid-user', 'invalid-pass');

            rpPostStub.rejects({
                error: {
                    success: false,
                    errorMessage: 'Unauthorized',
                    errorDetails: {}
                },
                message: '401 - {"success":false,"errorMessage":"Unauthorized","errorDetails":{}}'
            });

            return shortTokenTimeoutInstance.sendRequest(testPutRequest)
                .catch(err => {
                    should.exist(err);
                    should.exist(err.message);
                    should.exist(err.name);
                    should.exist(err.sdkMethod);

                    err.message.should.equal('401 - {"success":false,"errorMessage":"Unauthorized","errorDetails":{}}');
                    err.name.should.equal('SdkError');
                    err.sdkMethod.should.equal('Authentication');
                });
        });
    });
});
