var db = require('../config/db');

var Device = db.model('Device', {
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