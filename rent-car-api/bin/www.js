 var express = require('express');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var http = require('http');
 
 var app = express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
   extended: false
 }));
 app.use(cookieParser());

var server = http.createServer(app);


 app.get('/', function (req, res) {
   res.send('Hello World!');
 });
 app.on('error', onError);
 app.listen(3000, onListening);


 app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   var bind = typeof port === 'string' ?
     'Pipe ' + port :
     'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }

 /**
  * Event listener for HTTP server "listening" event.
  */

 function onListening() {
   
 }