/*var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Order = db.model('Order', {
    id: Schema.Types.ObjectId,
    _device: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    _customer: {
        type: Schema.Types.ObjectId,
        ref: 'Costumer'
    },
    comment: String
});*/

var Order = function () {

};

var OrderInstanceMock1 ={
    id: '1',
    device: '1',
    costumer: '1',
    comment: 'Bla bla'
};

/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
Order.find = function(criteria, cb) {
    //returns 1 mocked order
    return cb(null, [OrderInstanceMock1]);
};

/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
Order.save = function (order, cb) {
    return cb(null, this);
};


module.exports = Order;