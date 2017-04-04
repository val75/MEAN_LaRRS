/*
 * app_api/controllers/groups.js - Controller for groups API
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
    Group = mongoose.model('Group'),

    sendJsonResponse, groupList, groupReadOne;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
groupList = function (req, res) {
    Group
        .find()
        .exec(function (err, groups) {
            if (!groups) {
                sendJsonResponse(res, 404, {
                    "message": "No groups found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(groups);
            sendJsonResponse(res, 200, groups);
        });
};

groupReadOne = function (req, res) {
    if (req.params && req.params.group_id) {
        Group
            .findById(req.params.group_id)
            .exec(function (err, group) {
                if (!group) {
                    sendJsonResponse(res, 404, {
                        "message": "Group not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(group);
                sendJsonResponse(res, 200, group);
            });
    } else {
        console.log('No group_id specified');
        sendJsonResponse(res, 404, {
            "message": "No group_id in request"
        });
    }
};

module.exports = {
    groupList    : groupList,
    groupReadOne : groupReadOne
};
//----------------  END PUBLIC METHODS  --------------