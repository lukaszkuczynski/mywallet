module.exports = {
  createSpending : function(amount) {
    operation = {
      'amount' : amount,
      'op_type' : 'spending',
      'time' : new Date()
    } 
    return operation;
  }
}

