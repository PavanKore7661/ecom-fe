import api from "../api/axios";

/*
    Add product to cart
*/
export const addToCartApi = async (productId, quantity) => {
  const response = await api.post(
    `/cart/add?productId=${productId}&quantity=${quantity}`,
  );
  console.log("Add to cart response:", response.data);
  return response.data;
};

/*
    Get logged-in user cart
*/
export const getCartApi = async () => {
  const response = await api.get("/cart");
  console.log("Get cart response:", response.data);
  return response.data;
};

/*
    Remove cart item
*/
export const removeCartItemApi = async (cartItemId) => {
  const response = await api.delete(`/cart/remove/${cartItemId}`);

  return response.data;
};

/*
    Update quantity
*/
export const increaseCartItemQuantity = async (cartItemId) => {
  const response = await api.put(`/cart/increase/${cartItemId}`);
  return response.data;
};

export const decreaseCartItemQuantity = async (cartItemId) => {
  const response = await api.put(`/cart/decrease/${cartItemId}`);
  return response.data;
};
