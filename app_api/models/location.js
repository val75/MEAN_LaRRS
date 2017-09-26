/*
 * location.js - Mongoose model for asset locations table
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
    types = ['city', 'lab', 'rack', 'chassis'],

    Schema   = mongoose.Schema,

    LocationSchema = new Schema({
        name:  { type: String, required: true, unique: true },
        notes: { type: String                               },
        type: { type: String, enum: types },
        parent_id: { type: Schema.Types.ObjectId, ref: 'Location' },
        parent_name: { type: String },
        ancestors: [{
            id: { type: Schema.Types.ObjectId, ref: 'Location' },
            name: { type: String }
        }]
    });

//----------------- END MODULE SCOPE VARIABLES ---------------

mongoose.model( 'Location', LocationSchema);