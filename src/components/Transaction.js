import React from 'react';

function Transaction({ transaction }) {
  const { amount, description, category, type } = transaction;
  const color = type === 'expense' ? 'red' : 'green';
  const sign = type === 'expense' ? '-' : '+';

  return (
    <div style={{ color: color }}>
      {sign} {amount} | {description} | {category}
    </div>
  );
}

export default Transaction;
