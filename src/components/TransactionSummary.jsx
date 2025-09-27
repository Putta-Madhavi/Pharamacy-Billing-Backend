import React from "react";

const TransactionSummary = ({ billing }) => {
  if (!billing) return <p></p>;

  return (
    <div>
      <h3>Transaction Completed</h3>
      <p>Bill ID: {billing.id}</p>
      <p>Date: {new Date(billing.billingDate).toLocaleString()}</p>
      <p>Total: ₹{billing.totalAmount}</p>
      <p>Cash: ₹{billing.payment?.cashAmount}</p>
      <p>Card: ₹{billing.payment?.cardAmount}</p>
      <h4>Items:</h4>
      <ul>
        {billing.items.map((item) => (
          <li key={item.medicine.id}>
            {item.medicine.name} × {item.quantity} (₹{item.medicine.mrp})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionSummary;
