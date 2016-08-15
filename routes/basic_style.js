var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/bootstrap', function(req, res, next) {
//   res.render('basic_style', { title: 'Express' });
// });
router.get('/bootstrap', function(req, res, next) {
  res.render('bootstrap', { title: 'Express' });
});
router.get('/ace/', function(req, res, next) {
  res.render('ace/', { title: 'Express' });
});

module.exports = router;
