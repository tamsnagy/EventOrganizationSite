var requireOption = require('../common').requireOption;

/**
 * Saves the given device, it can be create or update.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.save( {
            //TODO save
        }, function (err, result) {
            if(err) {
                return next(new Error('Error deleting device'));
            }
            res.redirect('/device/list');
        });
    };

};