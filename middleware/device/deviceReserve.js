var mongoose = require('mongoose');
var requireOption = require('../common').requireOption;
var flatDatedDevice = require('../common').flatDatedDevice;

/**
 * Queries details to selected deviceId's in requestBody, and sends back to user.
 */
module.exports = function (objectrepository) {

    var deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        var ids = [];
        if(typeof req.body.selected === 'string') {
            ids = [mongoose.Types.ObjectId(req.body.selected)];
        } else {
            ids = req.body.selected.map(function(id) {
                return mongoose.Types.ObjectId(id);
            });
        }
        deviceModel.find( {
            '_id' : {$in : ids}
        }, function (err, results) {
            if(err) {
                return next(new Error('Error getting devices'));
            }
            res.tpl.devices = results.map(flatDatedDevice);
            return next();
        });
    };

};