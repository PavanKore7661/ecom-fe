import { useContext } from "react";

import Navbar from "../../components/layout/Navbar";
import { CartContext } from "../../context/CartContext";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice, placeOrder
  } = useContext(CartContext);
  console.log("cart items in cart page", cartItems);
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">{item.product.name}</h2>

                  <p>₹ {item.product.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-6">Total: ₹ {totalPrice}</h2>
          </div>
        )}
       <div className="flex justify-center">
         <button
           onClick={() => placeOrder()}
           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
         >
           Place Order
         </button>
       </div>

      </div>
    </div>
  );
}

export default CartPage;
