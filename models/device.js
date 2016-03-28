var Schema = require('mongoose').Schema;
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
});

module.exports = Device;