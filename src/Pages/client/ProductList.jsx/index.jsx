import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "phosphor-react";
import { Link } from "react-router-dom";
import FilterBar from "../../../components/FilterBar";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products?limit=12"
      );
      setProductData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="px-2 py-8 md:px-4">

      {/* LOADING SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-2xl h-[340px]"
            />
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500">
          Something went wrong. Try again.
        </p>
      )}

      {/* PRODUCT GRID */}
      {!isLoading && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productData.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* CATEGORY BADGE */}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.category.name} {/* ✅ fixed here */}
                  </span>
                )}

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* FLOATING ACTION BUTTONS */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="p-2 bg-white rounded-full shadow hover:bg-indigo-500 hover:text-white transition">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow hover:bg-indigo-500 hover:text-white transition">
                    <ShoppingCart size={18} />
                  </button>
                </div>

                {/* PRICE BADGE */}
                <span className="absolute bottom-3 left-3 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full">
                  ₹ {product.price}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-2 md:p-4">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base truncate">
                  {product.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  Premium quality product crafted with modern elegance.
                </p>

                {/* VIEW PRODUCT BUTTON */}
                <Link to={`/product/${product.id}`}>
                  <button className="mt-4 w-full py-2 text-sm font-medium border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ProductList;
