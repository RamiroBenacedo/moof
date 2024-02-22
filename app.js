var createError = require('http-errors');
var express = require('express');
var path = require('path');
const db= require("./database/models")
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var path = require('path')

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// cookies
app.use(function (req,res,next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {
    let idProductoraCookie = req.cookies.userId;
    
    db.Productoras.findByPk(idProductoraCookie)
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

// session
const session = require('express-session');
app.use(session({ secret: "moof",
                  resave: false,
                  saveUninitialized: true}))

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
