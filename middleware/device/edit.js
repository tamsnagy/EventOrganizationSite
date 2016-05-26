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

        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.brand === 'undefined') ||
            (typeof req.body.cost === 'undefined') ||
            (typeof req.body.type === 'undefined') ||
            (typeof req.body.purchaseDate === 'undefined')) {
            return next();
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