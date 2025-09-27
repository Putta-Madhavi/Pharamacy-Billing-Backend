const handleCheckout = () => {
  if (!payment || (payment.cashAmount === 0 && payment.cardAmount === 0)) {
    alert("Enter valid payment amounts!");
    return;
  }

  const request = {
    items: selectedItems.map(i => ({ medicineId: i.medicine.id, quantity: i.quantity })),
    cashAmount: payment.cashAmount,
    cardAmount: payment.cardAmount
  };

  checkoutBilling(request).then(res => setBilling(res));
};
