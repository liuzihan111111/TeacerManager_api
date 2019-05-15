var createError = require('http-errors'); // http异常处理
var express = require('express');  // exress
var path = require('path');  // path路径解析
var cookieParser = require('cookie-parser');  // 格式换cookie
var logger = require('morgan');  // 日志
var cors = require('cors'); // 引入cors解决跨域

var indexRouter = require('./routes/index'); // 路由文件
var usersRouter = require('./routes/users');  // 路由文件

var app = express();

app.use(cors()) // 允许跨域调用
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

// view engine setup
app.set('views', path.join(__dirname, 'views')); // __dirname当前路径
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 引入接口文件
app.use('/api/v1/', require('./api/v1/auth'));
// app.use('/api/v1/schedule/', require('./api/v1/schedule'));
app.use('/api/v2/common', require('./api/v1/common'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
