var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Costumer = db.model('Costumer', {
    id: Schema.Types.ObjectId,
    name: String,
    date: Date,
    place: String,
    money: Number,
    guestCount: Number
});

module.exports = Costumer;