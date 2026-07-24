import React, { useContext } from "react";
import {
  ShoppingCart,
  LogOut,
  Zap,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { MyAuth } from "../context/AuthProvider";
import { logout } from '../utils/validation';
import { MyCartProduct } from "../context/CartProvider";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(MyAuth);
  const { cartItems } = useContext(MyCartProduct);

  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-white/10">
      <div className="max-w-8xl h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <div className="w-10 h-10 rounded-2xl bg-lime-400 flex items-center justify-center">
            <Zap size={20} className="text-black fill-black" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Sky<span className="text-lime-400">Mart</span>
          </h1>
        </div>

        {/* Menu - with Active Links */}
        <ul className="hidden md:flex items-center gap-12 text-lg font-semibold">
          <li>
            <NavLink 
              to='/home' 
              className={({ isActive }) => 
                isActive 
                  ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' 
                  : 'text-gray-500 hover:text-white transition'
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink 
              to='/about' 
              className={({ isActive }) => 
                isActive 
                  ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' 
                  : 'text-gray-500 hover:text-white transition'
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink 
              to='/products' 
              className={({ isActive }) => 
                isActive 
                  ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' 
                  : 'text-gray-500 hover:text-white transition'
              }
            >
              Products
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* User */}
          <div className="hidden sm:flex items-center gap-3 bg-[#171717] border border-white/10 rounded-2xl px-4 py-2">
            <div className="w-10 h-10 rounded-xl bg-lime-400 text-black font-bold flex items-center justify-center">
              {currentUser ? currentUser.fullName?.charAt(0).toUpperCase() : 'G'}
            </div>
            <span className="text-gray-300 text-lg font-medium">
              {currentUser ? currentUser.fullName : 'Guest'}
            </span>
          </div>

          {/* Cart */}
          <button 
            onClick={() => navigate('/cart')}
            className="cursor-pointer relative w-14 h-14 rounded-2xl border border-white/10 bg-[#171717] flex items-center justify-center hover:bg-[#222] transition group"
          >
            <ShoppingCart size={22} className="text-white group-hover:text-lime-400 transition" />
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-lime-400 text-black text-sm font-bold flex items-center justify-center">
              {cartItems ? cartItems.length : 0}
            </span>
          </button>

          {/* Logout */}
          <button 
            onClick={() => logout(setCurrentUser, navigate)}
            className="cursor-pointer w-14 h-14 rounded-2xl border border-white/10 bg-[#171717] flex items-center justify-center hover:bg-red-500/10 transition group"
          >
            <LogOut size={22} className="text-gray-300 group-hover:text-red-400 transition" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;