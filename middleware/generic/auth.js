/**
 * This middleware checks the credentials,
 * if they are ok, set session values and redirect to /device/edit
 * if they are wrong, set error message
 */
module.exports = function () {

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.pass === 'undefined')) {
            return next(Error('Password not found'));
        }


        //check password
        if ('VerySecretP4ssw0rd' !== req.body.pass) {
            return next(Error('Wrong password!'));
        }

        //login is ok
        //redirect to / so the app can decide where to go next
        return next(res.redirect('/device/list'));
    };

};