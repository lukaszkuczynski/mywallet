module.exports = {
  createSpending : function(amount) {
    operation = {
      'amount' : amount,
      'op_type' : 'spending',
      'time' : new Date()
    } 
    return operation;
  },

  createInitialBalance : function(amount) {
    balance = {
      'amount' : amount,
      'time' : new Date(),
      'operation' : null
    }
    return balance;
  },

  processOperation : function(operation, balance) {
    var amount_to_add = 0;
    if (operation.op_type == 'spending') {
        amount_to_add = -1 * operation.amount        
    } else if (operation.op_type == 'income') {
        amount_to_add = operation.amount
    } else {
        throw "unknown operation type"
    }
    new_balance_amount = balance.amount + amount_to_add
    return {
      'amount' : new_balance_amount,
      'time' : new Date(),
      'operation': operation
    }
  }
}

