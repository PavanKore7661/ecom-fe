import api from "../api/axios";

export const placeOrderapi = async () => {
  const response = await api.post("/orders/place");
  return response.data;
};

/*    Get all orders */
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

//admin orders
export const getAllOrders = async () => {
  const response = await api.get("/orders/admin/orders");
  return response.data;
};

/*    Get single order details */
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};


