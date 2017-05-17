var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var db = require('./db')
var MongoClient = require('mongodb').MongoClient
 , assert = require('assert');
var url = "mongodb://podstock:Podstock123@ds139959.mlab.com:39959/podstock"
db.connect(url)

// app.use(function(req,res,next){
//     //console.log("test",db.users.findOne({email:"rahulrajan@gmail.com"}))
//     next();
//   //   var cookies = new Cookies( req, res, { "keys": keys } )
//   // , username
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.post('/login',(req,res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  var nm = req.body.username;
  var ps = req.body.password;
  // req.db.users.find("username: " + nm,function(err,doc){
  //   console.log("error: ", err)
  // })
  MongoClient.connect(url, function(err, db) {
      console.log(db.collection('users').find({"username": "" + nm}))

  console.log(db.collection('users').find({"username": "" + nm}))
  db.collection('users').find({"username": "" + nm}).toArray(function(err,data){
    console.log(data.length)
    if(data.length > 0)
    {
      console.log("success")
      // res.writeHead(200,{
      //   'Set-Cookie':'user=' + nm
      // },function(r){
      //     res.sendFile(__dirname + "/public/index.html");
      //
      // })
      res.cookie('user',nm)
       res.render('index',{title: PodStock});
    }
    else {
      console.log("fail")
      res.send("fail");
    }
  })
  // db.close();
})
app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/authentication/login.html");
})
module.exports = app;
