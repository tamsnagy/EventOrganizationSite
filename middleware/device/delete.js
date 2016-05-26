var requireOption = require('../common').requireOption;

/**
 * Deletes device, and all related orders.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.findByIdAndRemove(req.query.id, function (err) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.redirect('/device/list');
        });
    };

};