/*
 * app_server/controllers/reservations.js - Server controller for assets reservations
 */

/*jslint        node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */
'use strict';

//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
    request = require('request'),
    apiOptions = {
        server : "http://localhost:3000"
    },

    _showError, renderCreateReservationForm, renderInfoReservation,
    reservationInfo, createReservation, doCreateReservation, deleteReservation;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN UTILITY METHODS --------------
_showError = function (req, res, status) {
    var title, content;

    if (status === 404) {
        title   = "404, page not found";
        content = "Looks like we can't find this page, sorry!";
    } else {
        title   = status + ", something's gone wrong";
        content = "Something, somewhere, has just gone a little wrong";
    }

    res.status(status);
    res.render('generic-text', {
        title   : title,
        content : content
    });
};

renderCreateReservationForm = function (req, res, assetDetail) {
    res.render('reservation-create', {
        title : 'Create Reservation',
        pageHeader : {
            title : 'Create Reservation',
            strapline : 'Reserve available asset'
        },
        asset: {
            _id: assetDetail._id,
            hostname: assetDetail.hostname,
            assetTag: assetDetail.assetTag
        }
    });
};

renderInfoReservation = function (req, res, reservationDetail) {
    res.render('reservation-info', {
        title: 'Reservation Info',
        pageHeader : {
            title : 'Reservation Info',
            strapline : 'reservation details'
        },
        reservation: reservationDetail
    });
};
//----------------  END UTILITY METHODS  --------------

//---------------- BEGIN PUBLIC METHODS --------------
createReservation = function (req, res) {
    var
        requestOptions, path;

    path = "/api/assets/" + req.params.assetId;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var
                doc = body,
                assetInfo = [];

            if ( response.statusCode === 200 ) {
                assetInfo = {
                    _id: doc._id,
                    hostname: doc.hostname,
                    assetTag: doc.tag,
                    skuModel: doc.sku.map(function (mysku) { return mysku.name } ),
                    hwModel: doc.hwModel.map(function (myhwm) { return myhwm.name } ),
                    mfgName: doc.manufacturer.map(function (mymfg) { return mymfg.name } ),
                    locName: doc.location.map(function (myloc) { return myloc.name } ),
                    groupName: doc.group.map(function (mygroup) { return mygroup.name } ),
                    assetStatus: doc.healthStatus.map(function (myhstat) { return myhstat.name } ),
                    resStatus: doc.reserved
                };
                renderCreateReservationForm(req, res, assetInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

reservationInfo = function (req, res) {
    var
        requestOptions, path;

    path = "/api/reservations/" + req.params.reservation_id;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "GET",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var
                doc = body,
                reservationInfo = [];

            if (response.statusCode === 200) {
                reservationInfo = {
                    _id: doc._id,
                    assetId: doc.assetId,
                    user: doc.user,
                    notes: doc.notes,
                    startTime: doc.start_time,
                    endTime: doc.end_time
                };
                renderInfoReservation(req, res, reservationInfo);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    )
};

doCreateReservation = function (req, res) {
    console.log(req.body);
    var
        requestOptions, path, postData;

    path = '/api/reservations';
    postData = {
        asset_id : req.body.assetId,
        user : req.body.userName,
        notes : req.body.reservationNotes
    };
    requestOptions = {
        url    : apiOptions.server + path,
        method : "POST",
        json   : postData
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/')
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    )
};

deleteReservation = function (req, res) {
    var
        requestOptions, path, reservationId;

    reservationId = req.params.reservation_id;
    path = '/api/reservations/' + reservationId;
    requestOptions = {
        url    : apiOptions.server + path,
        method : "DELETE",
        json   : {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    createReservation   : createReservation,
    reservationInfo     : reservationInfo,
    doCreateReservation : doCreateReservation,
    deleteReservation   : deleteReservation
};
//----------------  END PUBLIC METHODS  --------------