var requireOption = require('../common').requireOption;

/**
 * Returns device data based on id.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.findOne( {
            //TODO find by id req.query.id
        }, function (err, result) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.tpl.device = result;
            return next();
        });
    };

};