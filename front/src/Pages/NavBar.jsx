import React, { use, useEffect } from "react";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function NavBar() { 
  const [userDetails,setuserDetails] =  useState('');
  const {cartCount} = useCart(); 
 
  const navigate = useNavigate();

  useEffect(()=>{
    const updateUser = () => {
      const user =localStorage.getItem("userName");
      setuserDetails(user);
    }  

    window.addEventListener("user-changed",updateUser);

    updateUser();

    return ()=> window.removeEventListener("user-changed",updateUser);

  },[])

 
  const logout = () => {
     localStorage.clear()
     setuserDetails(null);
  }
  


  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="FootAura Logo" className="h-8 object-fill" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg">
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors cursor-pointer">
            <Link to="/help">Contact</Link>
          </li>
          <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors cursor-pointer">
            <Link to="/myorders">My Orders</Link>
          </li>
          {/* <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors cursor-pointer">
            Contact
          </li> */}
          {userDetails && <li className="text-sm font-medium text-gray-400 text-muted-foreground hover:text-black transition-colors cursor-pointer" onClick={logout}>
            Logout
          </li>}
        </ul>

        <div className="flex gap-7">
          <Link to="/cart" className="relative inline-block cursor-pointer">
            <IoCartOutline size={26} className="text-black" />
            <span className="absolute -top-2 -right-6 bg-blue-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          </Link>
          {!userDetails ?
          (<Link to="/login" className="flex items-center cursor-pointer">
            <CgProfile size={25} className="text-gray-600" />
          </Link> ): 
           (
             <div className="flex items-center cursor-pointer">
              <CgProfile size={25} className="text-gray-600" />
              <h1 className="ml-2 text-base text-gray-600">{userDetails.charAt(0).toUpperCase() + userDetails.slice(1)}</h1>
            </div> 
           )}
        </div>
      </div>
    </nav>
  );
}
