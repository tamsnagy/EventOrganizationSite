/*var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Costumer = db.model('Costumer', {
    id: Schema.Types.ObjectId,
    name: String,
    date: Date,
    place: String,
    money: Number,
    guestCount: Number
});*/


var Costumer = function () {

};

var CostumerInstanceMock1 ={
    id: '1',
    name: 'Kovács Béla',
    date: '2016-03-18',
    place: 'Budapest',
    money: 20000,
    guestCount: 120
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Costumer.findName = function(criteria, cb) {
    //returns 1 mocked costumer
    return cb(null, CostumerInstanceMock1.name);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Costumer.save = function (costumer, cb) {
    return cb(null, this);
};

Costumer.remove = function(id, cb) {
    return cb(null, this);
};

module.exports = Costumer;