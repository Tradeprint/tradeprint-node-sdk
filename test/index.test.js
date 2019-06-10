/* eslint-disable prefer-arrow-callback */

const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const RequestHandler = require('../lib/RequestHandler');
const OrderService = require('../lib/Services/OrderService');
const ProductService = require('../lib/Services/ProductService');
const Logger = require('../lib/Logger');

describe('When I import the SDK main module and access the available methods', function() {
    const subject = require('../index');

    let requestHandlerSetEnvironmentStub;
    let requestHandlerSetCredentialsStub;
    let loggerSetDebuggingStub;

    beforeEach(function() {
        requestHandlerSetEnvironmentStub = sinon.stub(RequestHandler, 'setEnvironment');
        requestHandlerSetCredentialsStub = sinon.stub(RequestHandler, 'setCredentials');
        loggerSetDebuggingStub = sinon.stub(Logger, 'setDebugging');
    });

    afterEach(function() {
        RequestHandler.setEnvironment.restore();
        RequestHandler.setCredentials.restore();
        Logger.setDebugging.restore();
    });

    const validEnvScenarios = [
        {
            url: 'https://sandbox.orders.tradeprint.io/v2',
            instance: subject.Environments.Sandbox,
            name: 'Sandbox'
        },
        {
            url: 'https://orders.tradeprint.io/v2',
            instance: subject.Environments.Production,
            name: 'Production'
        }
    ];

    validEnvScenarios.forEach(es => {
        it(`Then I can set the "${es.name}" environment`, function() {
            should.exist(es.instance);
            es.instance.getUrl().should.equal(es.url);
            es.instance.getName().should.equal(es.name);

            subject.setEnvironment(es.instance);

            const firstCall = requestHandlerSetEnvironmentStub.getCall(0);

            should.exist(firstCall);
            firstCall.should.have.been.calledWith(es.instance);
        });
    });

    const invalidEnvScenarios = [undefined, null, 'Sandbox', 'Production', {}, []];

    invalidEnvScenarios.forEach(ies => {
        it(`Then I can set the "${ies}" environment`, function() {
            (() => subject.setEnvironment(ies)).should.throw(`Input parameter "${ies}" must be a "TradeprintEnvironment" type`);
        });
    });

    const validDebugScenarios = [false, true];

    validDebugScenarios.forEach(ds => {
        it(`Then I can set the debugging flag to "${ds}"`, function() {
            subject.setDebugging(ds);

            const firstCall = loggerSetDebuggingStub.getCall(0);

            should.exist(firstCall);
            firstCall.should.have.been.calledWith(ds);
        });
    });

    const invalidDebugScenarios = ['false', 'true', undefined, [], {}, null];

    invalidDebugScenarios.forEach(ds => {
        it(`Then I cannot set the debugging flag to "${ds}"`, function() {
            (() => subject.setDebugging(ds)).should.throw(`Input parameter "${ds}" must be a boolean value`);
        });
    });

    it('Then I cannot set the debugging flag with no input', function() {
        (() => subject.setDebugging()).should.throw('Input parameter "undefined" must be a boolean value');
    });

    it('Then I can set the credentials', function() {
        subject.setCredentials('test-user', 'test-pass');

        const firstCall = requestHandlerSetCredentialsStub.getCall(0);

        should.exist(firstCall);
        firstCall.should.have.been.calledWith('test-user', 'test-pass');
    });

    const invalidCredentialsScenarios = [
        {
            paramOne: '',
            paramTwo: ''
        },
        {
            paramOne: 'test-user',
            paramTwo: ''
        },
        {
            paramOne: '',
            paramTwo: 'test-pass'
        },
        {
            paramOne: undefined,
            paramTwo: undefined
        },
        {
            paramOne: 'test-user',
            paramTwo: undefined
        },
        {
            paramOne: undefined,
            paramTwo: 'test-pass'
        },
        {
            paramOne: {},
            paramTwo: {}
        },
        {
            paramOne: 'test-user',
            paramTwo: {}
        },
        {
            paramOne: {},
            paramTwo: 'test-pass'
        }
    ];

    invalidCredentialsScenarios.forEach(ics => {
        it(`Then I cannot set credentials with "${ics.paramOne}" and "${ics.paramTwo}"`, function() {
            const expectedErrMsg = 'Both "username" and "password" parameters must be valid credential strings';

            (() => subject.setCredentials(ics.paramOne, ics.paramTwo)).should.throw(expectedErrMsg);
        });
    });

    it('Then I can create the orders service instance', function() {
        const subjectOrderService = new subject.OrderService();

        should.exist(subjectOrderService);
        subjectOrderService.should.be.instanceOf(OrderService);
    });

    it('Then I can create the products service instance', function() {
        const subjectProductService = new subject.ProductService();

        should.exist(subjectProductService);
        subjectProductService.should.be.instanceOf(ProductService);
    });
});
