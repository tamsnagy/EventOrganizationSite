var requireOption = require('../common').requireOption;
var flatDatedDevice = require('../common').flatDatedDevice;


/**
 * Queries available devices for specified date in request body, if no value is defined than for current day.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        var atDate;
        if ((typeof req.query === 'undefined') || (typeof req.query.atDate === 'undefined')) {
            atDate = new Date().toISOString().split('T')[0];
        } else {
            atDate = req.query.atDate;
        }

        deviceModel.find( {
            //TODO find based on atDate
        }, function (err, results) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.tpl.atDate = atDate;
            res.tpl.devices = results.map(flatDatedDevice);
            return next();
        });
    };

};