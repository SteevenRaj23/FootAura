import React from "react";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext.jsx.jsx";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function NavBar() {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="FootAura Logo" className="h-8 object-fill" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg">
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors ">
            <Link to="/">Home</Link>
          </li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors">
            <Link to="/help">Help</Link>
          </li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors">
            Services
          </li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors">
            Contact
          </li>
        </ul>

        <Link to="/cart" className="relative inline-block cursor-pointer">
          <IoCartOutline size={26} className="text-black" />
          <span className="absolute -top-2 -right-6 bg-blue-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
            {getTotalItems()}
          </span>
        </Link>
      </div>
    </nav>
  );
}
