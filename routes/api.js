var express = require('express');
var router = express.Router();
var operations = require('../operations');
var dao = require('../dao');

router.post('/spending', function(req, res, next) {
  var body = req.body;
  console.log('posting ',body);
  var spending = operations.createSpending(body.amount);
  console.log('ready to write spending ',spending);
  dao.saveOperation(spending);
  res.redirect('/');
});

module.exports = router;
