import axios from "axios";

const BASE_URL = "http://localhost:7090/api/billing";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMedicines = async () => {
  try {
    const response = await api.get("/medicine");
   
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return []; 
  }
};


export const calculateTotal = async (items) => {
  try {
    const response = await api.post("/calculate", items);
    return response.data;
  } catch (error) {
    console.error("Error calculating total:", error);
    return 0;
  }
};

export const checkoutBilling = async (billingRequest) => {
  try {
    const response = await api.post("/checkout", billingRequest);
    return response.data;
  } catch (error) {
    console.error("Checkout error:", error);
    return null;
  }
};
