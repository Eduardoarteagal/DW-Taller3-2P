var createError = require('http-errors'); // Manejo de errores HTTP
var express = require('express'); // Framework web Express.js
var path = require('path'); // Manejo de rutas de archivos
var cookieParser = require('cookie-parser'); // Manejo de cookies
var logger = require('morgan'); // Registro de solicitudes HTTP


var indexRouter = require('./routes/index'); // Rutas para la página de inicio
var usersRouter = require('./routes/users'); // Rutas para los usuarios
var fotosRouter = require('./routes/fotos'); // Rutas para las fotos
var fotosRestRouter = require('./routes/rest/fotos'); // Rutas para la API REST de fotos

var favicon = require('serve-favicon'); // Manejo del favicon

var app = express(); // Inicializa la aplicación Express


app.set('views', path.join(__dirname, 'views')); // Establece el directorio de vistas
app.set('view engine', 'ejs'); // Establece el motor de plantillas


app.use(logger('dev')); // Registro de solicitudes en modo de desarrollo
app.use(express.json()); // Analiza el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: false })); // Analiza el cuerpo de las solicitudes URL-encoded
app.use(cookieParser()); // Analiza las cookies
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde el directorio 'public'
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // Sirve el favicon


 app.use(function(req, res, next) {
   res.locals.body = '';
   res.render = function(view, options) {
     options = options || {};
     app.render(view, options, function(err, html) { // Renderiza la vista solicitada
       if (err) {
         return next(err);
       }
       options.body = html;
       app.render('menu', options, function(err, menuHtml) { // Renderiza el menú
         if (err) {
           return next(err);
         }
         res.send(menuHtml); // Envía la vista con el menú
       });
     });
   };
   next();
 });


app.use('/', indexRouter); // Rutas para la página de inicio
app.use('/users', usersRouter); // Rutas para los usuarios
app.use('/fotos', fotosRouter); // Rutas para las fotos
app.use('/rest/fotos', fotosRestRouter); // Rutas para la API REST de fotos

app.use(function(req, res, next) {
  next(createError(404)); 
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message; // Mensaje de error
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Detalles del error en modo de desarrollo

  res.status(err.status || 500); // Establece el código de estado HTTP
  res.render('error'); // Renderiza la vista 'error.ejs'
});

// Exporta la aplicación Express
module.exports = app;