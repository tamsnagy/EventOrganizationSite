var Schema = require('mongoose').Schema;
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
});

module.exports = Order;