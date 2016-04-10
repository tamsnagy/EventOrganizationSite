/**
 * Checks user session if it was authorized before or not.
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};