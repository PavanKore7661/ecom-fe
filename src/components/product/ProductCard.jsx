import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg shadow-md bg-white overflow-hidden p-4">

      {/* Image and Details Side by Side */}
      <div className="flex gap-4">

        {/* Left Side - Image */}
        <div className="w-1/2">
          <img
            src={`http://localhost:8090/uploads/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-xl font-bold">{product.name}</h2>

          <p className="text-gray-600 mt-2 text-sm">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-green-600 mt-4">
            ₹ {product.price}
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => navigate(`/products/${product.id}`)}
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
      >
        View Details
      </button>

    </div>
  );
}

export default ProductCard;