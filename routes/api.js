var express = require('express');
var router = express.Router();

router.post('/spending', function(req, res, next) {
  var body = req.body;
  console.log('posting ',body)
  res.send('OK');
});

module.exports = router;
