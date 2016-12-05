var should = require('chai').should(),
    operations = require('../operations');
    

describe('#operations', function(){
  it(' can create spending ', function(){
    var spending = operations.createSpending(20);
    spending.amount.should.equal(20);
    spending.op_type.should.equal('spending');
  });
})

describe('#balance', function() {
  it('given spending returns balance substracted', function() {
    var spending = operations.createSpending(10);
    var balance = operations.createInitialBalance(50);
    var newBalance = operations.processOperation(spending, balance);    
    newBalance.amount.should.equal(40);
  });
})
