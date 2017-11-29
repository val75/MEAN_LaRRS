/*
 * passport.js - Config file for passport
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
    passport      = require( 'passport'       ),
    LocalStrategy = require( 'passport-local' ).Strategy,
    mongoose      = require( 'mongoose'       ),

    User          = mongoose.model( 'User' );

//----------------- END MODULE SCOPE VARIABLES ---------------

passport.use(new LocalStrategy({
    usernameField: 'email'
},
  function (username, password, done) {
      User.findOne({ email: username }, function (err, user) {
          if (err) { return done(err) }
          if (!user) {
              return done(null, false, {
                  message: 'Incorrect username.'
              });
          }
          if (!user.validPassword(password)) {
              return done(null, false, {
                  message: 'Incorrect password.'
              });
          }
          return done(null, user);
      });
  }
));