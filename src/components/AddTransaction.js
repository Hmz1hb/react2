import React, { useState } from 'react';

function AddTransaction({ onAddTransaction }) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({ amount, description, category, type });
    setAmount(0);
    setDescription('');
    setCategory('');
    setType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        <option value="housing">Housing</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="leisure">Leisure</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select type</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;

