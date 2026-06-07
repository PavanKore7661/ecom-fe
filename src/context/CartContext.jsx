import { createContext, useContext, useEffect, useState } from "react";

import {
  addToCartApi,
  decreaseCartItemQuantity,
  getCartApi,
  increaseCartItemQuantity,
  removeCartItemApi,
} from "../services/cartService";

import{placeOrderapi} from "../services/orderService";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /*
      Fetch cart from backend
  */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCartApi();
      /*   Backend may return: data.items   */
      setCartItems(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*
      Add product to backend cart
  */
  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartApi(productId, quantity);

      /*     Reload cart      */

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  /*  Remove item  */
  const removeFromCart = async (cartItemId) => {
    try {
      await removeCartItemApi(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  /*  Increase quantity  */
  const increaseQuantity = async (cartItemId) => {
    try {
      await increaseCartItemQuantity(cartItemId);
      await fetchCart();
    } catch (e) {
      console.error(e);
    }
  };

  /*   Decrease quantity  */
  const decreaseQuantity = async (itemId) => {
    try {
      await decreaseCartItemQuantity(itemId);
      await fetchCart();
    } catch (e) {
      console.error(e);
    }
  };

  /*  Total price */
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  /*   Load cart on app start  */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart();
    }
  }, []);

const placeOrder = async () => {
    try {
      await placeOrderapi();
      fetchCart();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,

        loading,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        totalPrice,

        fetchCart,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
