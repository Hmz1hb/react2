import React, { useState } from 'react';


function AddTransaction({ onAddTransaction }) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [categories, setCategories] = useState([
    'housing', 'food', 'transport', 'leisure', 'personal', 'other'
  ]);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
    onAddTransaction({ amount, description, category, type, createdAt: currentDate, userDate: transactionDate });
    setAmount(0);
    setDescription('');
    setCategory('');
    setType('');
    setTransactionDate('');
  };
  

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)} required className="form-select">
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {category === 'other' && (
        <div className="col-md-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="form-control"
          />
          <button type="button" onClick={handleAddCategory} className="btn btn-primary mt-2">Add Category</button>
        </div>
      )}
      <div className="col-md-4">
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="col-md-4">
        <select value={type} onChange={(e) => setType(e.target.value)} required className="form-select">
          <option value="">Select type</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="col-md-12">
        <button type="submit" className="btn btn-success">Add Transaction</button>
      </div>
    </form>
  );
}

export default AddTransaction;
