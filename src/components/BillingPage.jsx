import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingTable from "./BillingTable";
import CheckoutButton from "./CheckoutButton";

const BillingPage = ({ setBilling }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([
    { medicine: { id: 1, name: "Paracetamol", mrp: 20 }, quantity: 2 },
    { medicine: { id: 2, name: "Amoxicillin", mrp: 50 }, quantity: 1 },
  ]);

  const handleCheckout = () => {
  
    const billingData = {
      id: Math.floor(Math.random() * 10000),
      billingDate: new Date(),
      totalAmount: selectedItems.reduce(
        (sum, item) => sum + item.quantity * item.medicine.mrp,
        0
      ),
      payment: { cashAmount: 50, cardAmount: 40 },
      items: selectedItems,
    };

    setBilling(billingData); 
    navigate("/transaction"); 
  };

  return (
    <div>
      <BillingTable selectedItems={selectedItems} />
      <CheckoutButton onClick={handleCheckout} />
    </div>
  );
};

export default BillingPage;
