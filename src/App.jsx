import React, { useState, useEffect } from "react";
import MedicineSelector from "./components/MedicineSelector";
import QuantityInput from "./components/QuantityInput";
import BillingTable from "./components/BillingTable";
import PaymentSplit from "./components/PaymentSplit";
import TransactionSummary from "./components/TransactionSummary";
import { getMedicines, calculateTotal, checkoutBilling } from "./api/Api";

function App() {
  const [medicines, setMedicines] = useState([]); // always array
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [payment, setPayment] = useState(null);
  const [billing, setBilling] = useState(null);
  const [error, setError] = useState("");

  // Load medicines on mount
  useEffect(() => {
    getMedicines().then(data => setMedicines(data)); // data is an array
  }, []);

  // Add selected medicine to billing list
  const addItem = () => {
    if (!selectedMedicine) return; // no medicine selected
    const med = medicines.find(m => m.id === parseInt(selectedMedicine));
    if (!med) return;

    if (quantity > med.quantity) {
      setError("Not enough stock!");
      return;
    }

    setError("");
    const exists = selectedItems.find(item => item.medicine.id === med.id);
    if (exists) {
      if (exists.quantity + quantity > med.quantity) {
        setError("Not enough stock!");
        return;
      }
      setSelectedItems(selectedItems.map(item =>
        item.medicine.id === med.id ? {...item, quantity: item.quantity + quantity} : item
      ));
    } else {
      setSelectedItems([...selectedItems, { medicine: med, quantity }]);
    }

    setQuantity(1);
  };

  const handleCalculate = () => {
    calculateTotal(selectedItems.map(i => ({ medicineId: i.medicine.id, quantity: i.quantity })))
      .then(res => setTotalAmount(res));
  };

  const handleCheckout = () => {
    if (!payment) {
      alert("Set payment first!");
      return;
    }
    const request = {
      items: selectedItems.map(i => ({ medicineId: i.medicine.id, quantity: i.quantity })),
      cashAmount: payment.cashAmount,
      cardAmount: payment.cardAmount
    };
    checkoutBilling(request).then(res => setBilling(res));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pharmacy Billing</h1>

      {/* Medicine dropdown */}
      <MedicineSelector 
        medicines={medicines} 
        selected={selectedMedicine} 
        setSelected={setSelectedMedicine} 
      />

      {/* Quantity input */}
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />

      <button onClick={addItem}>Add Medicine</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Billing Table */}
      <BillingTable selectedItems={selectedItems} />

      <button onClick={handleCalculate}>Calculate Total</button>
      {totalAmount > 0 && <p>Total Amount: ₹{totalAmount}</p>}

      {/* Payment Split */}
      <PaymentSplit total={totalAmount} setPayment={setPayment} />

      <button onClick={handleCheckout}>Checkout</button>

      {/* Transaction Summary */}
      <TransactionSummary billing={billing} />
    </div>
  );
}

export default App;
