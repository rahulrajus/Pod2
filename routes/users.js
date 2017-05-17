var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  var collection = db.get().collection('users')
  // var collection = db.get().collection('users')

  res.render('users',{})
});

module.exports = router;
