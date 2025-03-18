var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fotosRouter = require('./routes/fotos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.body = '';
  res.render = function(view, options) {
    options = options || {};
    app.render(view, options, function(err, html) { // Usar app.render
      if (err) {
        return next(err);
      }
      options.body = html;
      app.render('menu', options, function(err, menuHtml) { // Usar app.render
        if (err) {
          return next(err);
        }
        res.send(menuHtml);
      });
    });
  };
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fotos', fotosRouter);

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