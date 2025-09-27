import React from "react";

const MedicineSelector = ({ medicines = [], selected, setSelected }) => {
  return (
    <div>
      <label htmlFor="medicine-select">Select Medicine:</label>
      {medicines.length > 0 ? (
        <select
          id="medicine-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">--Select--</option>
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} (Stock: {m.quantity}, ₹{m.mrp})
            </option>
          ))}
        </select>
      ) : (
        <p>No medicines available</p>
      )}
    </div>
  );
};

export default MedicineSelector;
