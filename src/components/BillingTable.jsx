import React, { useState } from "react";

const BillingTable = ({ selectedItems }) => {
  const [showTotal, setShowTotal] = useState(false);

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.medicine.mrp,
    0
  );

  const handleCalculate = () => {
    setShowTotal(true);
  };

  return (
    <div>
      <h3>Selected Medicines</h3>
      <table
        border="1"
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.medicine.id}>
              <td>{item.medicine.name}</td>
              <td>{item.quantity}</td>
              <td>{item.medicine.mrp}</td>
              <td>{item.quantity * item.medicine.mrp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      

     
      {showTotal && <h4>Total: ₹{totalAmount}</h4>}
    </div>
  );
};

export default BillingTable;
