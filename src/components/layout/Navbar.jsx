import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";

function Navbar() {
  const token = localStorage.getItem("token");
  const { cartItems } = useContext(CartContext);
  const role = localStorage.getItem("role");
  const totalCartItems = cartItems.reduce((total, item) =>
                            total + item.quantity,0,);
  console.log("cart items in navbar", cartItems);
  return (
    <nav className="bg-pink-300 text-white px-6 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">E-Commerce</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {token ? (
          <>
          {
            role === "ROLE_ADMIN" &&
            (
              <Link to="/admin/dashboard">
                  Admin Dashboard
              </Link>
            )
          }
            <Link to="/orders">Orders</Link>
            <Link to="/cart">Cart ({totalCartItems})</Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");

                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
