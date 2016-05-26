var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Order = db.model('Order', {
    _device: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    _costumer: {
        type: Schema.Types.ObjectId,
        ref: 'Costumer'
    },
    money: Number,
    guestCount: Number,
    comment: String
});


module.exports = Order;