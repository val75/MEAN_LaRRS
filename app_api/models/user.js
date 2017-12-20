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
        email:     { type: String, required: true, unique: true },
        username:  { type: String, required: true, unique: true },
        hash:      { type: String                               },
        salt:      { type: String                               }
    });

//----------------- END MODULE SCOPE VARIABLES ---------------

userSchema.methods.setPassword = function (password) {
    // crypto.randomBytes(size[, callback])
    // size = number indicating the number of bytes to generate
    // If callback is provided, the bytes are generated asynchronously, not the case here
    // TODO: maybe increase <size> to 32 or even 64
    this.salt = crypto.randomBytes(16).toString('hex');

    // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    // a synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation
    // TODO: increase <iterations> to 10,000
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');

    // Returns true or false
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var
        // This actually creates a full date object, representing current date/time
        expiry = new Date();

    // getDate() returns the day part of the date object as a number between 1-31
    // The token will expire after 1 day
    // TODO: maybe make expiration interval a configurable parameter, stored in env
    expiry.setDate(expiry.getDate() + 1);

    // If we want to deal with token expiration in minutes, we could use this
    //expiry.setMinutes(expiry.getMinutes() + 5);

    return jwt.sign({
        _id      : this._id,
        email    : this.email,
        username : this.username,
        exp      : parseInt(expiry.getTime() / 1000) //getTime returns miliseconds since Epoch, divided by 1000 it returns seconds
    }, process.env.JWT_SECRET );
};

mongoose.model( 'User', userSchema );