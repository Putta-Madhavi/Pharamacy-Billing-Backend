import React, { useState, useEffect } from "react";

const PaymentSplit = ({ total, setPayment }) => {
  const [cash, setCash] = useState("");
  const [card, setCard] = useState("");

  useEffect(() => {
    
    const cashNum = parseFloat(cash) || 0;
    const cardNum = parseFloat(card) || 0;
    setPayment({ cashAmount: cashNum, cardAmount: cardNum });
  }, [cash, card, setPayment]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Enter Payment Amounts</h3>
      <div>
        <label>Cash Payment:</label>
        <input
          type="number"
          value={cash}
          onChange={(e) => setCash(e.target.value)}
          placeholder="Enter cash amount"
        />
      </div>
      <div>
        <label>Card Payment:</label>
        <input
          type="number"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          placeholder="Enter card amount"
        />
      </div>
    </div>
  );
};

export default PaymentSplit;
