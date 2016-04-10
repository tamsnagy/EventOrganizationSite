var requireOption = require('../common').requireOption;

/**
 * Queries orders after current date.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');
    var orderModel = requireOption(objectrepository, 'orderModel');
    var costumerModel = requireOption(objectrepository, 'costumerModel');

    return function (req, res, next) {

        orderModel.find( {
            //TODO find by today
        }, function (err, orderResult) {
            if(err) {
                return next(new Error('Error getting orders'));
            }
            deviceModel.findAll({

            }, function(err, devicesResults) {
                if(err) {
                    return next(new Error('Error getting matching devices'))
                }

                costumerModel.findName( {

                }, function(err, costumerResults) {
                    if(err) {
                        return next(new Error('Error getting costumer names'));
                    }

                    //TODO Match the datas coming from the 3 models

                    res.tpl.orders = [];
                    return next();
                });
            });

        });
    };

};