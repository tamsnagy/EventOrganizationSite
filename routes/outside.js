var renderMW = require('../middleware/generic/render');
var authMW = require('../middleware/generic/auth');

var deviceModel = require('../models/device');

module.exports = function (app) {

    var objectRepository = {
        deviceModel: deviceModel
    };

    /**
     * Login page.
     */
    app.get('/login',
        renderMW(objectRepository, 'login')
    );

    /**
     * Check authorization.
     */
    app.post('/login',
        authMW(objectRepository)
    );
};