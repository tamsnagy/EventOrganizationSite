/*var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Device = db.model('Device', {
    id: Schema.Types.ObjectId,
    name: String,
    brand: String,
    type: String,
    cost: {
        type: Number,
        default: 48000
    },
    purchaseDate: Date
});*/

var Device = function () {

};

var DeviceInstanceMock1 = {
    id: 1,
    name: 'Hangfal',
    brand: 'Sony',
    type: 'hang',
    cost: 15000,
    purchaseDate: '2014-06-23'
};

var DeviceInstanceMock2 = {
    id: 2,
    name: 'Diszkógömb',
    brand: 'Party',
    type: 'fény',
    cost: 70000,
    purchaseDate: '2008-12-12'
};

var DeviceInstanceMock3 = {
    id: 3,
    name: 'Mikrofon',
    brand: 'Sony',
    type: 'hang',
    cost: 45000,
    purchaseDate: '2015-06-23'
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Device.find = function(criteria, cb) {
    //returns 3 mocked device
    return cb(null, [DeviceInstanceMock1, DeviceInstanceMock2, DeviceInstanceMock3]);
};

/**
 * Find all elements with the criteria[]
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Device.findAll = function(criteria, cb) {
    //returns 2 mocked device
    return cb(null, [DeviceInstanceMock1, DeviceInstanceMock2]);
};

/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Device.findOne = function(criteria, cb) {
    return cb(null, DeviceInstanceMock1);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Device.save = function (device, cb) {
    return cb(null, this);
};

/**
 * Delete an object
 * @param cb
 * @returns {*}
 */
Device.remove = function (id, cb) {
    return cb(null);
};

module.exports = Device;