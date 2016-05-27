var requireOption = require('../common').requireOption;

/**
 * Deletes device, and all related orders.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');
    var orderModel = requireOption(objectrepository, 'orderModel');

    return function (req, res, next) {

        deviceModel.findByIdAndRemove(req.query.id, function (err) {
            if(err) {
                return next(new Error('Error deleting devices'));
            }
            orderModel.find({'_device':req.query.id}, function (err, orders) {
                if(err) {
                    return next(new Error('Error deleting orders'));
                }
                for(var i = 0; i < orders.length; i++) {
                    orderModel.findByIdAndRemove(orders[i]._id, function (err) {
                        if (err) {
                            return next(new Error('Error deleting orders'));
                        }
                    });
                }
                res.redirect('/device/list');
            });
        });
    };

};