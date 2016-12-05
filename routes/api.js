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
  dao.findLastBalance({}, function(lastBalance){
    var balance = operations.processOperation(operation, lastBalance);
    dao.saveBalance(balance);
    res.redirect('/');
  });

});

router.get('/operation', function(req,res){
  dao.findAll({}, function(operations){
    res.send(operations);  
  });
});


router.get('/balance/last', function(req,res){
  dao.findLastBalance({}, function(balance){
    res.send(balance);  
  });
});

module.exports = router;
