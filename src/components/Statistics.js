import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { ArcElement, PieController } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.css';

// Register the arc element and pie controller
Chart.register(ArcElement, PieController);

const Statistics = ({ transactions }) => {
  const [data, setData] = useState({
    labels: [
      'food',
      'housing',
      'transportation',
      'leisure',
      'personal',
      'other',
      'income',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#CDDC39',
          '#FF9800',
          '#9C27B0',
          '#4CAF50',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#CDDC39',
          '#FF9800',
          '#9C27B0',
          '#4CAF50',
        ],
      },
    ],
  });

  useEffect(() => {
    const categories = {
      food: 0,
      housing: 0,
      transportation: 0,
      leisure: 0,
      personal: 0,
      other: 0,
      income: 0,
    };

    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        categories[transaction.category] -= transaction.amount;
      } else if (transaction.type === 'income') {
        categories.income += transaction.amount;
      }
    });

    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: Object.values(categories),
        },
      ],
    }));
  }, [transactions]);

  const options = {
    plugins: {
      tooltip: {
        intersect: true,
        callbacks: {
          label: (context) => {
            const transaction = transactions[context.dataIndex];
            const amount = transaction.type === 'expense' ? `-$${transaction.amount}` : `$${transaction.amount}`;
            return `${transaction.date}: ${transaction.category} ${amount}`;
          },
        },
      },
      legend: {
        onClick: (event, legendItem) => {
          const category = legendItem.text;
          const transaction = transactions.find(
            (transaction) => transaction.category === category
          );
          const amount = transaction.type === 'expense' ? `-$${transaction.amount}` : `$${transaction.amount}`;
          alert(`${transaction.date}: ${transaction.category} ${amount}`);
        },
      },
    },
  };

  return (
    <div className="container">
      <h2 className="text-center">Transaction Statistics</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Pie data={data} options={options} key={transactions.length} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
