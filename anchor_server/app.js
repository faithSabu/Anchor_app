var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const config = require('./config/db')
const mongoose = require('mongoose')

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var chatRouter = require('./routes/chatRoute')
var messageRouter = require('./routes/MessageRoute')

var app = express();

const connection = mongoose.connect(config.database,{
  useNewUrlParser: true, useUnifiedTopology:true
})
if(connection){
  console.log('Database Connected');
}else{
  console.log('Database Connection Error');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/chat',chatRouter);
app.use('/message',messageRouter)

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
