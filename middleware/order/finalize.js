var requireOption = require('../common').requireOption;

/**
 * Saves the order in DB according to request body.
 */
module.exports = function (objectrepository) {

    var orderModel = requireOption(objectrepository, 'orderModel');
    var costumerModel = requireOption(objectrepository, 'costumerModel');

    return function (req, res, next) {

        var costumer = new costumerModel();
        costumer.save(function (err, result) {
            if(err) {
                costumerModel.remove({}, function(err, result) {
                    if(err) {
                        return next(new Error('Could not rollback'));
                    }
                });
                return next(new Error('Error saving costumer'));
            }
            var order = new orderModel();
            order.save(function(err, result) {
                if(err) {
                    return next(new Error('Error saving order'));
                }
                res.redirect('/');
            });
        });
    };

};