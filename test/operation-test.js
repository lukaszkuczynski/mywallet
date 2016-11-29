var should = require('chai').should(),
    operations = require('../operations');
    

describe('#operations', function(){
  it(' can create spending ', function(){
    var spending = operations.createSpending(20);
    spending.amount.should.equal(20);
    spending.op_type.should.equal('spending');
  });
})
