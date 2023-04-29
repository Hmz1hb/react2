import React from 'react';
import Transaction from './Transaction';

function TransactionList({ transactions, onDeleteTransaction, onEditTransaction }) {
  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map((transaction, index) => (
        <Transaction
          key={index}
          transaction={transaction}
          onDeleteTransaction={() => onDeleteTransaction(index)}
          onEditTransaction={(updatedTransaction) => onEditTransaction(index, updatedTransaction)}
        />
      ))}
    </div>
  );
}

export default TransactionList;
