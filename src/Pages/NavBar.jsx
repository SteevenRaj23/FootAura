import React from 'react'
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from '../Context/CartContext.jsx.jsx';

export default function NavBar() {
  const { getTotalItems } = useCart();
   

  return (
      <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">FootAura</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg">
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors "><a href='/'>Home</a></li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors" ><a href="/help">Help</a></li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors">Services</li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors">Contact</li>
        </ul>


        <div className="relative inline-block">
  <IoCartOutline size={26} className="text-black" />

      <span
        className="absolute -top-2 -right-6 bg-blue-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
        {getTotalItems()}
      </span>
    </div>

        </div>
       
    </nav>
  )
}
