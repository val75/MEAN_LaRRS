/*
 * app_server/controllers/others.js - Angular Express controller
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
    angularApp;
//----------------- END MODULE SCOPE VARIABLES ---------------

//---------------- BEGIN PUBLIC METHODS --------------
angularApp = function (req, res) {
    res.render('layout', { title : 'LaRRS' });
};

module.exports = {
    angularApp : angularApp
};
//----------------  END PUBLIC METHODS  --------------