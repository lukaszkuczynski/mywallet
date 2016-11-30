var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var operationSchema = mongoose.Schema({
    time: Date,
    op_type: String,
    amount: Number,
    tags: String
});
var Operation = mongoose.model('Operation', operationSchema);

module.exports = {

  saveOperation : function(operation) {
      var op = new Operation(operation);
      op.save(function(err, result){
        if(err) {console.dir(err); }
        console.log('written ',result)
      })
  }
}