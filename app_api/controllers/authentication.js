/*
 * app_api/controllers/authentication.js - Controller for authentication API
 */

/*jslint        node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

//---------------- BEGIN MODULE SCOPE VARIABLES --------------
'use strict';

var
    passport = require( 'passport' ),
    mongoose = require( 'mongoose' ),

    User = mongoose.model( 'User' ),

    sendJSONresponse, register, login;

//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------

register = function (req, res) {
    if ( !req.body.username || !req.body.email || !req.body.password ) {
        sendJSONresponse(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

    var user = new User();

    user.username = req.body.username;
    user.email    = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;

        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        }
    });
};

login = function (req, res) {
    if ( !req.body.username || ! req.body.password ) {
        sendJSONresponse(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        } else {
            sendJSONresponse(res, 401, info)
        }
    })(req, res);

};

module.exports = {
    register : register,
    login    : login
};

//----------------  END PUBLIC METHODS  --------------