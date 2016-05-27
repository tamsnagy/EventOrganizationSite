var expect = require('chai').expect;
var authMW = require('../../../middleware/generic/auth');

var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);

describe('auth middleware', function() {
    it('should not let the user log in since body is undefined', function(done){
        var req = {};
        var res = {tpl:{}};

        authMW()(req, res, function(err) {
            expect(res.tpl.devices).to.eql(undefined);
            expect(err).to.eql(Error('Password not found'));
            done();
        });
    });

    it('should not let the user log in since body.password is undefined', function(done){
        var req = {body:{}};
        var res = {tpl:{}};

        authMW()(req, res, function(err) {
            expect(res.tpl.devices).to.eql(undefined);
            expect(err).to.eql(Error('Password not found'));
            done();
        });
    });

    it('should not let the user log in since password is wrong', function(done){
        var req = {body:{pass: 'WrongPassword'}};
        var res = {tpl:{}};

        authMW()(req, res, function(err) {
            expect(res.tpl.devices).to.eql(undefined);
            expect(err).to.eql(Error('Wrong password!'));
            done();
        });
    });

    it('should let the user log in since password is correct', function(done){
        var req = {body:{pass: 'VerySecretP4ssw0rd'}};
        var res = {redirect: chai.spy(function(url) {
           return 'got it';
        })};

        authMW()(req, res, function(url) {
            expect(res.redirect).to.have.been.called.with('/device/list');
            expect(url).to.eql('got it');
            done();
        });
    });
});