var requireOption = require('../common').requireOption;

/**
 * Saves the given device, it can be create or update.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        function saveHandler(res, req, next, device) {
            device.name = req.body.name;
            device.brand = req.body.brand;
            device.cost = req.body.cost;
            device.type = req.body.type;
            device.purchaseDate = req.body.purchaseDate;

            device.save(function(err, dev) {
                if (err) {
                    return next(new Error('Error saving device'));
                }
                return res.redirect('/device/list');
            });
        }

        if (! req.body.name ||
            ! req.body.brand ||
            ! req.body.cost  ||
            ! req.body.type  ||
            ! req.body.purchaseDate) {
            return next(Error('Missing expected value!'));
        }

        if(req.body.cost < 15000 || req.body.cost > 600000) {
            return next(Error('Cost must be between 15000 and 600000'));
        }

        if(new Date(req.body.purchaseDate) < new Date('2008-01-01')){
            return next(Error('Purchase date must happend after 2008-01-01'));
        }

        var device = undefined;
        if(typeof res.tpl.device !== 'undefined') {
            device = res.tpl.device;
            deviceModel.findById(req.query.id, function(err, dev){
                saveHandler(res, req, next, dev);
            });
        } else {
            device = new deviceModel();
            saveHandler(res, req, next, device);
        }
    };

};