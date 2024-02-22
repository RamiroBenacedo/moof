var createError = require('http-errors');
var express = require('express');
const db= require("./database/models");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');

var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const static = require('express-static');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/images/', express.static('./public/images'));
app.use('/public/stylesheets/', express.static('./public/stylesheets'));
app.use(session({secret:"MyApp",resave:false,saveUninitialized:true}));

// conexion sequelize
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('moof', 'root', "root", {
  host: 'localhost',
  dialect: 'mysql'
});

app.use(function (req,res,next) {
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;
    return next();
  }
  return next();
})

/*cookies*/
app.use(function (req,res,next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {
    let idUsuarioCookie = req.cookies.userId;
    
    db.Productora.findByPk(idUsuarioCookie)
    .then (function (user) {
      req.session.user = user.dataValues;
      res.locals.user = user.dataValues;
      return next();
    })
    .catch(function(error) {
      return res.send (error);
    })
  } else {
    return next();
  }
});

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
