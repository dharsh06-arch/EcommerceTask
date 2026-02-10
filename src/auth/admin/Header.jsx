import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthReducer";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm sticky top-0 z-50">
      
        <span className="text-slate-800 font-bold text-xl tracking-tight hidden sm:block">
          Admin Management
        </span>

      <nav className="flex items-center gap-6">
       
        
        <Button
          onClick={handleLogout}
          className="bg-indigo-950 text-white px-5 py-2 rounded-md text-sm font-medium 
                     hover:bg-indigo-800 transition-all duration-200 active:scale-95 shadow-md shadow-indigo-100"
        >
          Sign Out
        </Button>
      </nav>
    </header>
  );
};

export default Header;