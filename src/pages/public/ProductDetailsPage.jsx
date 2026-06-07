import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import { getProductById } from "../../services/productService";
import { CartContext } from "../../context/CartContext.jsx";

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar />

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={
              product.imageUrl
                ? product.imageUrl
                : "https://via.placeholder.com/500"
            }
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <p className="text-3xl font-bold mt-6">₹ {product.price}</p>

          <button
            onClick={() => addToCart(product.id, 1)}
            className="bg-black text-white px-6 py-3 rounded mt-8"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
