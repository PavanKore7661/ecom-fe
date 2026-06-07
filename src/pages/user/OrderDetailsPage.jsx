import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";

import { getOrderById } from "../../services/orderService";

function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);

      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading order...</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>

        <div className="border p-4 rounded mb-6">
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

        <h2 className="text-2xl font-bold mb-4">Ordered Products</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="border p-4 rounded">
              <h3 className="text-xl font-bold">{item.product.name}</h3>

              <p>Price: ₹ {item.price}</p>

              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
