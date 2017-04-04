/*
 * health_status.js - Mongoose model for asset health status
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

    StatusSchema = new Schema ({
        name:  { type: String, required: true},
        notes: { type: String                }
    });

//----------------- END MODULE SCOPE VARIABLES ---------------

mongoose.model( 'HealthStat', StatusSchema );