/*
 * reservation.js - Mongoose model for asset reservation
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
    mongoose = require( 'mongoose' ),

    Schema = mongoose.Schema,

    ReservationSchema = new Schema ({
        assetId:    { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
        user:       { type: String,                              required: true },

        start_time: { type: Date, default: Date.now                             },
        end_time:   { type: Date                                                }
    });
//----------------- END MODULE SCOPE VARIABLES ---------------

mongoose.model( 'Reservation', ReservationSchema );