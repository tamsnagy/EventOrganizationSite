var requireOption = require('../common').requireOption;
var flatDatedDevice = require('../common').flatDatedDevice;

/**
 * Returns all kind of devices from DB.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.find( {

        }, function (err, results) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.tpl.devices = results.map(flatDatedDevice);
            return next();
        });
    };

};