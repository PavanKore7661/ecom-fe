import { useEffect, useState } from "react";

import Navbar from "../../../ecom-fe/src/components/layout/Navbar.jsx";
import ProductCard from "../../../ecom-fe/src/components/product/ProductCard";
import {
  filterProducts,
  getProducts,
  searchProducts,
} from "../services/productService.js";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page, keyword, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let data;

      if (keyword.trim() !== "") {
        data = await searchProducts(keyword, page, 6);
      } else {
        data = await filterProducts(
          minPrice || null,
          maxPrice || null,
          null,
          null,
          page,
          6,
          sort,
        );
      }

      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Latest Products
            </h1>

            <p className="text-gray-500 mt-1">Discover amazing products</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="font-semibold">{products.length}</span> Products
            Found
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white p-5 rounded-2xl shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}

            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);

                setPage(0);
              }}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Sort */}

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);

                setPage(0);
              }}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none"
            >
              <option value="newest">Newest</option>

              <option value="price_asc">Price Low to High</option>

              <option value="price_desc">Price High to Low</option>
            </select>

            {/* Min Price */}

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
            />

            {/* Max Price */}

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
            />

            {/* Button */}

            <button
              onClick={() => {
                setPage(0);

                fetchProducts();
              }}
              className="bg-blue-500 hover:bg-gray-800 transition text-white px-4 py-3 rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl font-semibold animate-pulse">
              Loading Products...
            </div>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing filters or search keyword
            </p>
          </div>
        ) : (
          /* Product Grid */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}

        {totalPages > 0 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="bg-black text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
            >
              Prev
            </button>

            <span className="font-medium text-gray-700">
              Page {page + 1} of {totalPages}
            </span>

            <button
              disabled={page + 1 === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-black text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
