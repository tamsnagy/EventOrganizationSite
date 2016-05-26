var renderMW = require('../middleware/generic/render');
var availableMW = require('../middleware/device/available');
var listMW = require('../middleware/device/list');
var editMW = require('../middleware/device/edit');
var deleteMW = require('../middleware/device/delete');
var getByIdMW = require('../middleware/device/getById');

var deviceModel = require('../models/device');
var costumerModel = require('../models/costumer');
var orderModel = require('../models/order');

module.exports = function (app) {

    var objectRepository = {
        deviceModel: deviceModel,
        costumerModel: costumerModel,
        orderModel: orderModel
    };

    /**
     * Lists all devices available at a day, default current day.
     */
    app.get('/',
        availableMW(objectRepository),
        renderMW(objectRepository, 'main')
    );

    /**
     * Lists all devices.
     */
    app.get('/device/list',
        listMW(objectRepository),
        renderMW(objectRepository, 'deviceList')
    );

    /**
     * Returns all details to the selected device, rendered for editing.
     */
    app.get('/device/edit',
        getByIdMW(objectRepository),
        renderMW(objectRepository, 'deviceEdit')
    );

    /**
     * Saves the device even if it's newly created, without an id.
     */
    app.post('/device/save',
        editMW(objectRepository)
    );

    /**
     * Deletes a device.
     */
    app.use('/device/delete',
        deleteMW(objectRepository)
    );
};