import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import Statistics from './Statistics';


function HomePage() {
  const [transactions, setTransactions] = useState(() => {
    const localTransactions = localStorage.getItem('transactions');
    const initialTransactions = localTransactions ? JSON.parse(localTransactions) : [];
    localStorage.setItem('transactions', JSON.stringify(initialTransactions));
    return initialTransactions;
  });

  const [totalMoney, setTotalMoney] = useState(0);
  const [spentLastMonth, setSpentLastMonth] = useState(0);
  const [earnedLastMonth, setEarnedLastMonth] = useState(0);

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const deleteTransaction = (index) => {
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const editTransaction = (index, updatedTransaction) => {
    const newTransactions = transactions.map((transaction, i) => (i === index ? updatedTransaction : transaction));
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  useEffect(() => {
    calculateTotalMoney();
    calculateTotalExpense();
    calculateTotalIncome();
  }, [transactions]);

  const calculateTotalMoney = () => {
    let total = transactions.reduce((sum, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.type === "expense" ? sum - amount : sum + amount;
    }, 0);
    setTotalMoney(total);
  };

  const calculateTotalExpense = () => {
    let totalExpense = transactions.reduce((sum, transaction) => {
      if (transaction.type === 'expense') {
        return sum + parseFloat(transaction.amount);
      }
      return sum;
    }, 0);
    setSpentLastMonth(totalExpense);
  };

  const calculateTotalIncome = () => {
    let totalIncome = transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        return sum + parseFloat(transaction.amount);
      }
      return sum;
    }, 0);
    setEarnedLastMonth(totalIncome);
  };


  return (
    <div className="container">
      <h1 className="my-4 text-center">Personal Finance</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Money</h5>
              {/* Replace '1000' with your total money variable */}
              <p className="card-text display-4">{totalMoney}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Spent Last Month</h5>
              {/* Replace '300' with your spent last month variable */}
              <p className="card-text display-4">-{spentLastMonth}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Earned Last Month</h5>
              {/* Replace '500' with your earned last month variable */}
              <p className="card-text display-4">{earnedLastMonth}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12">
          <Statistics transactions={transactions} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-12">
          <AddTransaction onAddTransaction={addTransaction} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
            onEditTransaction={editTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
