import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";

import { getOrders } from "../../services/orderService";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  /*
      Fetch orders when page loads
  */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      console.log("fetch orders--", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*
      Loading UI
  */
  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border p-4 rounded shadow">
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>Order ID:</strong> {order.id}
                    </p>

                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>

                    <p>
                      <strong>Total:</strong> ₹ {order.totalAmount}
                    </p>
                  </div>

                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-black text-white px-4 py-2 rounded h-fit"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
