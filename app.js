require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require( 'passport' );

require('./app_api/models/db');
require('./app_api/config/passport');

//var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
    'app_client/app.js',
    'app_client/apiHelp/apiHelp.controller.js',
    'app_client/home/home.controller.js',
    'app_client/tabview/tabview.controller.js',
    'app_client/assetDetail/assetDetail.controller.js',
    'app_client/assetDelete/assetDelete.controller.js',
    'app_client/assetEdit/assetEdit.controller.js',
    'app_client/auth/register/register.controller.js',
    'app_client/auth/login/login.controller.js',
    'app_client/common/services/larrsData.service.js',
    'app_client/common/services/authentication.service.js',
    'app_client/common/directives/reservationStatus/reservationStatus.directive.js',
    'app_client/common/directives/reservationButton/reservationButton.directive.js',
    'app_client/common/directives/reservationInfo/reservationInfo.directive.js',
    'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
    'app_client/common/directives/navigation/navigation.controller.js',
    'app_client/common/directives/navigation/navigation.directive.js',
    'app_client/common/directives/pageHeader/pageHeader.directive.js',
    'app_client/common/directives/headerInfo/headerInfo.directive.js',
    'app_client/assetAddModal/assetAddModal.controller.js',
    'app_client/reservationCreateModal/reservationCreateModal.controller.js',
    'app_client/reservationInfoModal/reservationInfoModal.controller.js',
    'app_client/admin/admin.controller.js',
    'app_client/skuAddModal/skuAddModal.controller.js',
    'app_client/hwmodelAddModal/hwmodelAddModal.controller.js',
    'app_client/mfgAddModal/mfgAddModal.controller.js',
    'app_client/locationAddModal/locationAddModal.controller.js',
    'app_client/groupAddModal/groupAddModal.controller.js',
    'app_client/hstatAddModal/hstatAddModal.controller.js',
    'app_client/skuEditModal/skuEditModal.controller.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/larrs.min.js', uglified.code, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Script generated and saved: larrs.min.js');
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

//app.use('/', routes);
app.use('/api', routesApi);
app.use('/users', users);

app.use(function (req, res) {
    res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
