var requireOption = require('../common').requireOption;
var flatDatedDevice = require('../common').flatDatedDevice;

/**
 * Returns device data based on id.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.findOne( {
            _id: req.query.id
        }, function (err, result) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            if(! result) {
                res.tpl.device = new deviceModel();
            } else {
                res.tpl.device = flatDatedDevice(result);
            }
            return next();
        });
    };

};