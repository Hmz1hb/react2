import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { ArcElement, PieController } from 'chart.js';

// Register the arc element and pie controller
Chart.register(ArcElement, PieController);

const Statistics = ({ transactions }) => {
  const categories = {
    food: 0,
    housing: 0,
    transportation: 0,
    leisure: 0,
    personal: 0,
    other: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === 'expense') {
      categories[transaction.category] += transaction.amount;
    }
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#CDDC39',
          '#FF9800',
          '#9C27B0',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#CDDC39',
          '#FF9800',
          '#9C27B0',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Expense Statistics</h2>
      <Pie data={data} />
    </div>
  );
};

export default Statistics;
