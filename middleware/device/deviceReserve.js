var requireOption = require('../common').requireOption;

/**
 * Queries details to selected deviceId's in requestBody, and sends back to user.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.find( {

        }, function (err, results) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.tpl.devices = results;
            return next();
        });
    };

};