var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var operationSchema = mongoose.Schema({
  time: Date,
  op_type: String,
  amount: Number,
  tags: String
});
var Operation = mongoose.model('Operation', operationSchema);

var balanceSchema = mongoose.Schema({
  time: Date,
  amount: Number,
  operation: operationSchema
});

var Balance = mongoose.model('Balance', balanceSchema);

module.exports = {

  saveOperation : function(operation) {
    var op = new Operation(operation);
    op.save(function(err, result){
      if(err) {console.dir(err); }
      console.log('written ',result)
    })
  },

  findAll : function(error, success) {
    Operation.find(function(err, operations){
      if (err) return console.error(err);
      success(operations);
    }); 
  },

  saveBalance : function(balance) {
    var bal = new Balance(balance);
    bal.save(function(err, result){
      if(err) {console.dir(err); }
      console.log('written ',result)
    })

  },

  findLastBalance : function(error, success) {
    var query = Balance.find().limit(1).sort({time: -1});
    query.exec(function(err, response){
      if (err) return console.error(err);
      if (response.length == 0) throw "no balance found";
      success(response[0]);
      console.log(response);
    });
  }
}