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
    types = ['switch', 'server'],

    AssetSchema = new Schema({

        tag:      { type: String },
        hostname: { type: String },
        type:     { type: String, enum: types },
        serial:   { type: String,                                     required: true },
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
        location_ru: { type: Number },
        group: [{
            id:   { type: Schema.Types.ObjectId, ref: 'Group',        required: true },
            name: { type: String,                                     required: true }
        }],
        healthStatus: [{
            id:   { type: Schema.Types.ObjectId, ref: 'HealthStatus', required: true },
            name: { type: String,                                     required: true }
        }],
        system: [{
            cpu_mfg: [{
                id: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
                name: { type: String }
            }],
            cpu_model: { type: String },
            mem_mfg: [{
                id: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
                name: { type: String }
            }],
            mem_size: { type: Number },
            disk_mfg: [{
                id: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
                name: { type: String }
            }],
            disk_model: { type: String },
            nic10g_mfg: [{
                id: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
                name: { type: String }
            }],
            nic10g_model: { type: String }
        }],
        network: [{
            ip_10g: { type: String },
            ip_1g:  { type: String },
            ip_bmc: { type: String }
        }],

        reserved: { type: Boolean, default: false,                    required: true },
        res_id:   { type: Schema.Types.ObjectId, ref: 'Reservation'                  }
});

//----------------- END MODULE SCOPE VARIABLES ---------------

mongoose.model( 'Asset', AssetSchema );