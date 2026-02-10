import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Users, Settings } from "lucide-react";

const Aside = () => {
  const items = [
    { title: "Dashboard", slug: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Products", slug: "/admin/products", icon: <Package size={20} /> },
    { title: "Users", slug: "/admin/users", icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-56 h-screen fixed top-0 bg-indigo-950 text-slate-300 flex flex-col border-r border-slate-800">
  

      {/* Navigation Links */}
      <nav className="flex-1 mt-20 px-4  space-y-2">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.slug}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
              ${isActive 
                ? "bg-white text-black shadow-lg shadow-indigo-900/20" 
                : "hover:border-white hover:border hover:text-white"}
            `}
          >
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              {item.icon}
            </span>
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

 
    </aside>
  );
};

export default Aside;