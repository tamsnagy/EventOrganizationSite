var requireOption = require('../common').requireOption;

/**
 * Queries orders after current date.
 */
module.exports = function (objectrepository) {

    //var deviceModel = requireOption(objectrepository, 'deviceModel');
    var orderModel = requireOption(objectrepository, 'orderModel');
    var costumerModel = requireOption(objectrepository, 'costumerModel');

    return function (req, res, next) {
        costumerModel.find({
            'date': {$gte: new Date()}
        }, function(err, costumers) {
            if(err) {
                return next(new Error('Error getting orders'));
            }
            var costumerIds = costumers.map(function(costumer){
                return costumer._id;
            });
            orderModel
                .find({
                    '_costumer': {$in: costumerIds}
                })
                .populate('_costumer _device')
                .exec(function(err, orders) {
                    if (err) {
                        return next(new Error('Error getting orders'));
                    }
                    res.tpl.orders = orders.map(function(order){
                        var o = {};
                        o.name = order._device.name;
                        o.brand = order._device.type;
                        o.costumer = order._costumer.name;
                        o.date = order._costumer.date.toISOString().split('T')[0];
                        o.comment = order.comment;
                        return o;
                    });
                    return next();
                });
        });
    };

};