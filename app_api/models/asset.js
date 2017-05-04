/*
 * asset.js - Mongoose model for assets
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

    AssetSchema = new Schema({

        tag:      { type: String },
        hostname: { type: String },
        sku: [{
            id:   { type: Schema.Types.ObjectId, ref: 'Sku',          required: true },
            name: { type: String,                                     required: true }
        }],
        hwModel: [{
            id:   { type: Schema.Types.ObjectId, ref: 'HwModel',      required: true },
            name: { type: String,                                     required: true }
        }],
        manufacturer: [{
            id:   { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
            name: { type: String,                                     required: true }
        }],
        location: [{
            id:   { type: Schema.Types.ObjectId, ref: 'Location',     required: true },
            name: { type: String,                                     required: true }
        }],
        group: [{
            id:   { type: Schema.Types.ObjectId, ref: 'Group',        required: true },
            name: { type: String,                                     required: true }
        }],
        healthStatus: [{
            id:   { type: Schema.Types.ObjectId, ref: 'HealthStatus', required: true },
            name: { type: String,                                     required: true }
        }],

        reserved: { type: Boolean, default: false,                    required: true }
});

//----------------- END MODULE SCOPE VARIABLES ---------------

mongoose.model( 'Asset', AssetSchema );