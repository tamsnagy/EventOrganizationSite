var renderMW = require('../middleware/generic/render');
var deviceReserveMW = require('../middleware/device/deviceReserve');
var finalizeOrderMW = require('../middleware/order/finalize');
var listOrdersMW = require('../middleware/order/list');

var deviceModel = require('../models/device');
var costumerModel = require('../models/costumer');
var orderModel = require('../models/order');

module.exports = function (app) {

    var objectRepository = {
        deviceModel: deviceModel,
        costumerModel: costumerModel,
        orderModel: orderModel,
    };

    /**
     * Reserves selected devices.
     */
    app.post('/order/reserve',
        deviceReserveMW(objectRepository),
        renderMW(objectRepository, 'order')
    );


    /**
     * Finalizes an order with costumer data.
     */
    app.post('/order/finalize',
        finalizeOrderMW(objectRepository),
        renderMW(objectRepository, 'main')
    );

    /**
     * Lists all kind of orders after current date.
     */
    app.get('/order/list',
        listOrdersMW(objectRepository),
        renderMW(objectRepository, 'orderList')
    )


};