var expect = require('chai').expect;
var getByIdMW = require('../../../middleware/device/getById');

describe('getById middleware', function() {
    it('should return default device w/o values since no id is passed', function(done){
        var req = {query:{}};
        var res = {tpl:{}};
        var fakeDeviceModel = {findOne: function(some, cb) {
           cb(undefined,
               {
                   '_id': undefined,
                   'name': undefined,
                   'brand': undefined,
                   'type': undefined,
                   'cost': 48000
               })
        }};

        getByIdMW({
            deviceModel: fakeDeviceModel
        })(req, res, function(err) {
            expect(res.tpl.device).to.eql({
                'id': undefined,
                'name': undefined,
                'brand': undefined,
                'type': undefined,
                'cost': 48000
            });
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return device with id passed', function(done){
        var req = {query:{id: 'deviceId1'}};
        var res = {tpl:{}};
        var fakeDeviceModel = {findOne: function(some, cb) {
            cb(undefined,
                {
                    '_id': 'deviceId1',
                    'name': 'MyDevice',
                    'brand': 'Sony',
                    'type': 'hang',
                    'cost': 48000,
                    'purchaseDate': new Date('2016-05-26')
                })
        }};

        getByIdMW({
            deviceModel: fakeDeviceModel
        })(req, res, function(err) {
            expect(res.tpl.device).to.eql({
                'id': 'deviceId1',
                'name': 'MyDevice',
                'brand': 'Sony',
                'type': 'hang',
                'cost': 48000,
                'purchaseDate': '2016-05-26'
            });
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should throw error when db does not answer', function(done){
        var req = {query:{id: 'deviceId1'}};
        var res = {tpl:{}};
        var fakeDeviceModel = {findOne: function(some, cb) {
            cb('error', undefined)
        }};

        getByIdMW({
            deviceModel: fakeDeviceModel
        })(req, res, function(err) {
            expect(res.tpl.device).to.eql(undefined);
            expect(err).to.eql(Error('Error getting devices'));
            done();
        });
    });
});