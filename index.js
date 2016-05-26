var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'));

/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    return next();
});

/**
 + * Parse parameters in POST
 + */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Include all the routes
 */
require('./routes/outside')(app);
require('./routes/device')(app);
require('./routes/order')(app);

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send(err.message);

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function () {
});