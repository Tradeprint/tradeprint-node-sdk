/* eslint-disable prefer-arrow-callback */

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);

const subject = require('../../lib/Logger');

describe('When I call the logger', function() {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
    });

    afterEach(function() {
        console.log.restore();
        console.error.restore();
    });

    it('Then it logs the error string message', function() {
        subject.error('test error message');

        console.error.should.be.calledOnce;

        subject.debug('test debug message');

        const funcCallOne = console.error.getCall(0);
        const firstCallArg = funcCallOne.args[0];

        firstCallArg.should.include('test error message');
    });

    it('Then it logs the error object message', function() {
        subject.error({ errorDetails: 'test error message' });

        console.error.should.be.calledOnce;

        subject.debug('test debug message');

        const funcCallOne = console.error.getCall(0);
        const firstCallArg = funcCallOne.args[0];

        firstCallArg.should.include('{"errorDetails":"test error message"}');
    });

    it('Then it does not log debug message', function() {
        subject.setDebugging(false);

        subject.debug('test disabeld debug message');

        console.log.should.not.be.called;
    });

    it('Then it logs debug message when debugging enabled', function() {
        subject.setDebugging(true);

        subject.debug('test debug message one');

        console.log.should.be.calledOnce;

        const funcCallOne = console.log.getCall(0);
        should.exist(funcCallOne);

        const firstCallArg = funcCallOne.args[0];
        should.exist(firstCallArg);
        firstCallArg.should.include('test debug message one');

        subject.setDebugging(false);

        subject.debug('test debug message two');

        console.log.should.be.calledOnce;
        should.not.exist(console.log.getCall(1));
    });
});
