/**
 * This middleware checks the credentials,
 * if they are ok, set session values and redirect to /device/edit
 * if they are wrong, set error message
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.pass === 'undefined')) {
            return next();
        }


        //check password
        if ('VerySecretP4ssw0rd' !== req.body.pass) {
            res.tpl.error.push('Wrong password!');
            return next();
        }

        //login is ok
        //redirect to / so the app can decide where to go next
        return res.redirect('/device/list');
    };

};