/*
 * app_api/controllers/users.js - Controller for users API
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
    mongoose = require('mongoose'),
    User = mongoose.model('User'),

    sendJsonResponse, userList, userReadOne, userDeleteOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
userList = function (req, res) {
    User
        .find()
        .exec(function (err, users) {
            if (!users) {
                sendJsonResponse(res, 404, {
                    "message": "No users found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err); // Status code 404 -> not found
                return;
            }
            console.log(users);
            sendJsonResponse(res, 200, users);
        });
};

userReadOne = function (req, res) {
    if (req.params && req.params.user_id) {
        User
            .findById(req.params.user_id)
            .exec(function (err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err); // Status code 404 -> not found
                    return;
                }
                console.log(user);
                sendJsonResponse(res, 200, user);
            });
    } else {
        console.log('No user_id specified');
        sendJsonResponse(res, 404, {
            "message": "No user_id specified"
        });
    }
};

userDeleteOne = function (req, res) {
    var user_id = req.params.user_id;
    if (user_id) {
        User
            .findByIdAndRemove(user_id)
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err); // Status code 404 -> not found
                    return;
                }
                sendJsonResponse(res, 204, null); // Status code 204 -> no content
            });
    } else {
        console.log('No user_id specified');
        sendJsonResponse(res, 404, {
            "message": "No user_id specified"
        });
    }
};

module.exports = {
    userList      : userList,
    userReadOne   : userReadOne,
    userDeleteOne : userDeleteOne
};
//----------------  END PUBLIC METHODS  --------------