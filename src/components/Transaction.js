import React, { useState } from 'react';

function Transaction({ transaction, onDeleteTransaction, onEditTransaction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(transaction.description);

  const handleEdit = () => {
    onEditTransaction({ ...transaction, description: editedDescription });
    setIsEditing(false);
  };

  const { amount, description, category, type, createdAt, userDate } = transaction;
  const color = type === 'expense' ? 'text-danger' : 'text-success';
  const sign = type === 'expense' ? '-' : '+';

  return (
    <div className={`d-flex justify-content-between align-items-center my-2 ${color}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="form-control"
          />
          <button onClick={handleEdit} className="btn btn-primary mx-2">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            {sign} {amount} | {description} | {category} | Created: {createdAt} | User Date: {userDate}
          </div>
          <div>
            <button onClick={() => setIsEditing(true)} className="btn btn-outline-info btn-sm mx-1">
              Edit
            </button>
            <button onClick={onDeleteTransaction} className="btn btn-outline-danger btn-sm">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Transaction;
