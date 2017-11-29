/*
 * user.js - Mongoose model for users
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
    mongoose = require( 'mongoose'     ),
    crypto   = require( 'crypto'       ),
    jwt      = require( 'jsonwebtoken' ),
    Schema   = mongoose.Schema,

    userSchema = new Schema({
        email: { type: String, required: true, unique: true },
        name:  { type: String, required: true               },
        hash:  { type: String                               },
        salt:  { type: String                               }
    });

//----------------- END MODULE SCOPE VARIABLES ---------------

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET );
};

mongoose.model( 'User', userSchema );