/**
 * Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {*}
 */
function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(propertyName + ' required');
}

function flatDatedDevice(device) {
    var flat = {};
    flat.id = device._id;
    flat.name = device.name;
    flat.type = device.type;
    flat.cost = device.cost;
    flat.brand = device.brand;
    if(typeof device.purchaseDate !== 'undefined') {
        flat.purchaseDate = device.purchaseDate.toISOString().split('T')[0]
    }
    return flat;
}

module.exports.requireOption = requireOption;
module.exports.flatDatedDevice = flatDatedDevice;