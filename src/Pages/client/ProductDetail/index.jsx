import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
} from "phosphor-react";

const ProductDetail = () => {
  const { id } = useParams(); // ✅ get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse h-80 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* IMAGE */}
        <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category */}
            <span className="text-xs uppercase tracking-wide text-indigo-500">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    weight={i < Math.round(product.rating.rate) ? "fill" : "regular"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-semibold text-indigo-500">
                ₹ {Math.round(product.price * 83)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 border rounded-lg"
                >
                  <Minus size={16} />
                </button>

                <span className="font-medium">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2 border rounded-lg"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition">
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="p-3 border rounded-xl hover:bg-gray-100 transition">
                <Heart size={22} />
              </button>
            </div>
          </div>

          {/* META INFO */}
          <div className="mt-10 border-t pt-6 text-sm text-gray-500 space-y-2">
            <p>✔ Free delivery in 3–5 days</p>
            <p>✔ Easy 7-day return</p>
            <p>✔ Secure payment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
