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

    sendJsonResponse, groupList, groupReadOne, groupCreate, groupUpdateOne, groupDeleteOne;
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

groupCreate = function (req, res) {
    // Uniqueness for <name> is insured in the model
    Group.create({
        name: req.body.name,
        notes: req.body.notes
    }, function (err, group) {
        if (err) {
            sendJsonResponse(res, 400, err); // Status code 400 -> bad request
        } else {
            sendJsonResponse(res, 201, group); // Status code 201 -> resource created
        }
    });
};

groupUpdateOne = function (req, res) {
    if (!req.params.group_id) {
        sendJsonResponse(res, 404, {
            "message": "No group_id"
        });
        return;
    }
    Group
        .findById(req.params.group_id)
        .exec(
            function (err, group) {
                if (!group) {
                    sendJsonResponse(res, 404, {
                        "message": "Group not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                group.name = req.body.name;
                group.notes = req.body.notes;

                group.save(function (err, group) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, group);
                    }
                });
            }
        );
};

groupDeleteOne = function (req, res) {
    var group_id = req.params.group_id;
    if (group_id) {
        Group
            .findByIdAndRemove(group_id)
            .exec(
                function (err, group) {
                    if (err) {
                        sendJsonResponse(res, 404, err); // Status code 404 -> not found
                        return;
                    }
                    sendJsonResponse(res, 204, null); // Status code 204 -> no content
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No group_id"
        });
    }
};

module.exports = {
    groupList    : groupList,
    groupReadOne : groupReadOne,
    groupCreate : groupCreate,
    groupUpdateOne : groupUpdateOne,
    groupDeleteOne : groupDeleteOne
};
//----------------  END PUBLIC METHODS  --------------