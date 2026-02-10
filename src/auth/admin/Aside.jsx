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
    <aside className="w-56 h-screen fixed top-0 bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-800">
<div className="p-8">
        <div className=" bg-indigo-500 p-2 font-medium rounded-lg shadow-lg shadow-indigo-500/20" >
        Admin Mangement
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1  px-4  space-y-2">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.slug}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 relative rounded-lg transition-all duration-200 group
              ${isActive 
            ? "bg-indigo-500/10 text-white" 
                : "hover:bg-slate-800/50 hover:text-slate-200"}
            `}
          >
            {
              ({isActive}) => (
                 <>
                <span className={`${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm tracking-wide">{item.title}</span>
                {
                  isActive && (
                    <div className="absolute w-1 h-5 rounded-r-full bg-indigo-700 left-0"></div>
                  )
                }
                </>
              )
            }
           
          </NavLink>
        ))}
      </nav>

 
    </aside>
  );
};

export default Aside;