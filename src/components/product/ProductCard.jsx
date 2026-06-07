import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="border rounded-lg p-4 shadow cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img
        src="https://via.placeholder.com/200"
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-3">{product.name}</h2>

      <p className="text-gray-600 mt-2">{product.description}</p>

      <p className="text-2xl font-bold mt-3">₹ {product.price}</p>

      <button className="bg-black text-white px-4 py-2 mt-4 rounded w-full">
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;
