import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  User,
  List,
  X,
} from "phosphor-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/home" },
    { title: "Products", path: "/products" },
    { title: "Cart", path: "/cart" },
    { title: "Profile", path: "/profile" },
  ];

  // Auto close sidebar on md+ screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* HEADER */}
      <nav className="sticky top-0 z-50 h-20 w-full bg-white/95 backdrop-blur-md text-gray-900 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-12">

          {/* LEFT SECTION */}
          <div className="flex justify-between w-full items-center gap-3">
            {/* Logo */}
            <Link to="/home">
              <img
                src="/logoipsum-250.svg"
                alt="logo"
                className="w-36 hover:scale-105 transition-transform"
              />
            </Link>

            {/* Hamburger - Mobile only */}
            <button
              className="block md:hidden text-gray-700 hover:text-indigo-600"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <List size={28} />
            </button>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative pb-1 transition-all duration-300
                      ${isActive ? "text-indigo-600" : "text-gray-800"}
                      after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                      after:w-full after:origin-left after:scale-x-0
                      after:bg-indigo-600 after:transition-transform
                      hover:after:scale-x-100 hover:text-indigo-600`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex gap-6 text-gray-700">
              <ShoppingBag size={24} className="cursor-pointer hover:text-indigo-600 transition-colors" />
              <Heart size={24} className="cursor-pointer hover:text-pink-600 transition-colors" />
              <User size={24} className="cursor-pointer hover:text-indigo-600 transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR (mobile only) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white text-gray-900
        shadow-2xl border-r border-gray-200
        transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <img src="/logoipsum-250.svg" alt="logo" className="w-32" />
          <button 
            onClick={() => setOpen(false)} 
            aria-label="Close menu"
            className="text-gray-700 hover:text-indigo-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-3 p-5 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.title}>
              <NavLink
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-3.5 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-800"
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-gray-200 flex gap-8 text-gray-700">
          <ShoppingBag size={24} className="cursor-pointer hover:text-indigo-600" />
          <Heart size={24} className="cursor-pointer hover:text-pink-600" />
          <User size={24} className="cursor-pointer hover:text-indigo-600" />
        </div>
      </aside>
    </>
  );
};

export default Header;