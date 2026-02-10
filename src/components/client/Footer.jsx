import React from "react";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
} from "phosphor-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      {/* Top Section */}
      <div className="px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <img
            src="/logoipsum-250.svg"
            alt="logo"
            className="w-40 mb-4"
          />
          <p className="text-sm text-gray-500 leading-relaxed">
            Discover premium fashion pieces crafted to elevate your everyday
            style. Timeless design, modern elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Products</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Cart</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Profile</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Returns</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Shipping Info</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm text-gray-500 mb-4">
            Subscribe to get special offers and updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-l-md text-sm 
                         focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                         placeholder-gray-400"
            />
            <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-r-md 
                               hover:bg-indigo-700 transition-colors font-medium">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </p>

        <div className="flex gap-5">
          <InstagramLogo size={22} className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" />
          <FacebookLogo  size={22} className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" />
          <TwitterLogo   size={22} className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" />
          <LinkedinLogo  size={22} className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;