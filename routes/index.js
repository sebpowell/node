var express = require('express');
var router = express.Router();
// var vpns = require('./vpns.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  		"vpns": vpns
  	}
  );
});

module.exports = router;
