import React, { useState } from "react";
import { Funnel, X } from "phosphor-react";

const FilterBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FILTER BAR */}
      <div className="w-full bg-white shadow-sm border rounded-xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left - Title */}
        <div className="flex items-center gap-2">
          <Funnel size={20} className="text-indigo-500" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-4">
          {/* Category */}
          <select className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-400">
            <option>All Categories</option>
            <option>Necklaces</option>
            <option>Rings</option>
            <option>Bracelets</option>
            <option>Earrings</option>
          </select>

          {/* Price */}
          <select className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-400">
            <option>Price Range</option>
            <option>Under ₹1,000</option>
            <option>₹1,000 - ₹5,000</option>
            <option>₹5,000 - ₹10,000</option>
          </select>

          {/* Sort */}
          <select className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-400">
            <option>Sort By</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

          {/* Clear */}
          <button className="text-sm text-gray-500 hover:text-red-500 transition">
            Clear
          </button>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm"
        >
          <Funnel size={18} />
          Filters
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl p-6 animate-slideUp">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <select className="w-full px-4 py-3 border rounded-lg">
                <option>All Categories</option>
                <option>Necklaces</option>
                <option>Rings</option>
                <option>Bracelets</option>
                <option>Earrings</option>
              </select>

              <select className="w-full px-4 py-3 border rounded-lg">
                <option>Price Range</option>
                <option>Under ₹1,000</option>
                <option>₹1,000 - ₹5,000</option>
                <option>₹5,000 - ₹10,000</option>
              </select>

              <select className="w-full px-4 py-3 border rounded-lg">
                <option>Sort By</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 border rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 bg-indigo-500 text-white rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
