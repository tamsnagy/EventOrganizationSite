var mongoose = require('mongoose');
var requireOption = require('../common').requireOption;

/**
 * Saves the order in DB according to request body.
 */
module.exports = function (objectrepository) {

    var orderModel = requireOption(objectrepository, 'orderModel');
    var costumerModel = requireOption(objectrepository, 'costumerModel');
    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        if(! req.body.name ||
            ! req.body.date ||
            ! req.body.place ||
            ! req.body.money) {
            return next( new Error('Missing expected value!'));
        }

        if(req.body.money < 60000) {
            return next(new Error('Money should be at least 60000'));
        }

        costumerModel.findOne({
            'name': req.body.name,
            'place': req.body.place,
            'date': req.body.date
        }, function(err, costumer) {
            if(err){
                return next(new Error('Error finding costumer'));
            }
            if(! costumer) {
                costumer = new costumerModel();
                costumer.name = req.body.name;
                costumer.place = req.body.place;
                costumer.date = req.body.date;
                costumer.save(function(err, result){
                    if(err){
                        return next(new Error('Error saving costumer'));
                    }
                });
            }
            var deviceIds = [];
            if(typeof req.body.selected === 'string') {
                deviceIds = [mongoose.Types.ObjectId(req.body.selected)];
            } else {
                req.body.selected.map(function(id) {
                    return mongoose.Types.ObjectId(id);
                });
            }
            deviceModel.find( {
                '_id' : {$in : deviceIds}
            }, function (err, devices) {
                if(err) {
                    return next(new Error('Error getting devices'));
                }
                for(var i = 0; i < devices.length; i++) {
                    var order = new orderModel();
                    order._device = devices[i];
                    order._costumer = costumer;
                    order.money = req.body.money;
                    order.guestCount = req.body.guestCount;
                    order.comment = req.body.comment;

                    order.save(function(err, result) {
                        if (err) {
                            return next(new Error('Error saving costumer'));
                        }
                    });
                }
                return res.redirect('/');
            });
        });
    };

};