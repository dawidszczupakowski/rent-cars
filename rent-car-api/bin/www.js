const express = require("express");
const app = express();
const globalController = require("../api/controllers/global.controller");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.on('error', onError);
app.listen(3000, onListening);

globalController.setEndpoints(app);

 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   const bind = typeof port === 'string' ?
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
  return console.log("server is running on port 3000");
 }