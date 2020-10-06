process.env.NODE_ENV = process.env.NODE_ENV || 'staging';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appconfig = require('./config/index');
const cors = require('cors');
const https = require('https');
const http = require('http');
var fs = require('fs');

mongoose.Promise = global.Promise;

(async function(){

  await mongoose
   .connect(appconfig.dbUri, { poolSize: 10, auth: {
     user: "interviewee",
     password: 'Test$123'
   } })
   .then(() => console.log('Mongodb connection successful'))
   .catch(err => console.error(err));
 })()

const auth = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');


// const port = 3000;
var app = express();
// app.enable('trust proxy');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));


app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (process.env.NODE_ENV === 'staging') {

  const httpServer = http.createServer(app);
  // below port in development
  httpServer.listen(4000, () => {
    console.log('HTTP server is running at ', 4000);
  });

} else {

  const httpServer = http.createServer(app);
  // below port in development
  httpServer.listen(appconfig.port, () => {
    console.log('HTT server is running at ', appconfig.port);
  });

}

module.exports = app;
