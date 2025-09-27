import React from "react";

const QuantityInput = ({ quantity, setQuantity }) => (
  <div>
    <label>Quantity:</label>
    <input
      type="number"
      min="1"
      value={quantity}
      onChange={e => setQuantity(Number(e.target.value))}
    />
  </div>
);

export default QuantityInput;
