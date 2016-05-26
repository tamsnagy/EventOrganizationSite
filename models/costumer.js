var db = require('../config/db');

var Costumer = db.model('Costumer', {
    name: String,
    date: Date,
    place: String
});


module.exports = Costumer;