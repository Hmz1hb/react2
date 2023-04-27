import React from 'react';
import Transaction from './Transaction';

function TransactionList({ transactions }) {
  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map((transaction, index) => (
        <Transaction key={index} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
