var requireOption = require('../common').requireOption;

/**
 * Deletes device, and all related orders.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.remove( {
            //TODO delete
        }, function (err, result) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.redirect('/device/list');
        });
    };

};