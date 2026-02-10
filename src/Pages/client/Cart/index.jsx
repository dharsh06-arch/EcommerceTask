import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/carts/1"); // fetch first cart
      const cart = res.data;

      // Fetch product details for each item
      const products = await Promise.all(
        cart.products.map(async (item) => {
          const prodRes = await axios.get(
            `https://fakestoreapi.com/products/${item.productId}`
          );
          return {
            ...prodRes.data,
            quantity: item.quantity,
          };
        })
      );

      setCartItems(products);
    } catch (err) {
      setError("Failed to load cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading your cart...</div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-600 font-semibold">{error}</div>
    );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="text-blue-600 hover:underline font-medium text-lg"
        >
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 font-semibold text-gray-700 text-sm md:text-base">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {/* Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-6 py-5 border-b last:border-b-0 items-center hover:bg-gray-50 transition"
          >
            {/* Product Info */}
            <div className="col-span-6 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain border rounded"
              />
              <div>
                <h3 className="font-medium line-clamp-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1 uppercase">
                  {item.category}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center font-medium">
              ${item.price.toFixed(2)}
            </div>

            {/* Quantity */}
            <div className="col-span-2 text-center font-medium">
              {item.quantity}
            </div>

            {/* Subtotal */}
            <div className="col-span-2 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="px-6 py-6 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <div className="text-lg">
            <span className="font-semibold">Total Items:</span>{" "}
            {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          </div>
          <div className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-8 flex justify-end">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
