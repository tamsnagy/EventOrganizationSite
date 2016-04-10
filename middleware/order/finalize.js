var requireOption = require('../common').requireOption;

/**
 * Saves the order in DB according to request body.
 */
module.exports = function (objectrepository) {

    var orderModel = requireOption(objectrepository, 'orderModel');
    var costumerModer = requireOption(objectrepository, 'costumerModel');

    return function (req, res, next) {

        costumerModer.save( {

        }, function (err, result) {
            if(err) {
                costumerModer.remove({}, function(err, result) {
                    if(err) {
                        return next(new Error('Could not rollback'));
                    }
                });
                return next(new Error('Error saving costumer'));
            }
            orderModel.save({

            }, function(err, result) {
                if(err) {
                    return next(new Error('Error saving order'));
                }
                res.redirect('/');
            });
        });
    };

};