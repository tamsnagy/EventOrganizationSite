var mongoose = require('mongoose');
var requireOption = require('../common').requireOption;
var flatDatedDevice = require('../common').flatDatedDevice;


/**
 * Queries available devices for specified date in request body, if no value is defined than for current day.
 */
module.exports = function (objectrepository) {

    var costumerModel = requireOption(objectrepository, 'costumerModel');
    var deviceModel = requireOption(objectrepository, 'deviceModel');
    var orderModel = requireOption(objectrepository, 'orderModel');

    return function (req, res, next) {
        var atDate;
        if ((typeof req.query === 'undefined') || (typeof req.query.atDate === 'undefined')) {
            atDate = new Date().toISOString().split('T')[0];
        } else {
            atDate = req.query.atDate;
        }

        /**
         * Query for costumers who have orders for the day atDate.
         */
        costumerModel.find({
            'date' : {$gte: new Date(atDate), $lte: new Date(atDate)}
        }, function(err, costumers){
            if(err){
                return next(new Error('Error getting devices'));
            }
            var costumerIds = costumers.map(function(costumer){
                return costumer._id;
            });

            /**
             * Query for all orders of the costumers got before.
             */
            orderModel.find({
                '_costumer': {$in: costumerIds}
            }, function(err, orders){
                if(err){
                    return next(new Error('Error getting devices'));
                }
                var deviceIds = orders.map(function(order){
                    return order._device;
                });

                /**
                 * Query for all devices not in the list of orders for the day atDate.
                 */
                deviceModel.find({
                    '_id': {$nin: deviceIds}
                }, function(err, devices){
                    if(err){
                        return next(new Error('Error getting devices'));
                    }
                    res.tpl.atDate = atDate;
                    res.tpl.devices = devices.map(flatDatedDevice);
                    return next();
                });
            });
        });
    };

};