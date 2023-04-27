import React, { useState } from 'react';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import Statistics from './Statistics';

function HomePage() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
      <h1>Personal Finance</h1>
      <AddTransaction onAddTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
      <Statistics transactions={transactions} />
    </div>
  );
}

export default HomePage;
