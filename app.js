var express = require('express');
var cons = require('consolidate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('html', cons.swig);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/ace', express.static(path.join(__dirname, 'ace')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/', express.static(path.join(__dirname, 'views')));

var routes = require('./routes/index');
app.use('/', routes);
var users = require('./routes/users');
app.use('/users', users);
var table = require('./routes/table');
app.use('/table', table);
var basic_style = require('./routes/basic_style');
app.use('/basic_style', basic_style);
// var onProxy = require('./onProxy');


// app.post('/recycle',function(req,res){
  
//   res.json(fakeObject[req.body.page-1]);

// });
// app.post('/elearning/front/selectCats',function(req,res){
  
//   res.json(leftTop[req.body.page-1]);
// });
// app.get('/elearning/front/submitattacharticle',function(req,res){
  
//   onProxy(req,res);
  
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
