import { createContext, useContext, useEffect, useState } from "react";
import {getCartData, addToCart, removeFromCart, updateCart} from "../Service/cartService.js"
import React from "react";

const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount,setCartCount] = useState(0);

  useEffect(()=>{
    getCart();
  },[])  

  const getCart = async() =>{ 
    try{
      const res = await getCartData()
      setCart(res.items || [])
      setCartCount(getCartBadgeCount(res))
    }catch(error){
      console.log(error)
    }finally{

    }
  }

  const getCartBadgeCount = (cart) => {
  if (!cart?.items) return 0;

  return cart.items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
};



  // Add item to cart
  const addItem = async(product,size=7) => {
    try{
        const res = await addToCart(product._id,size,1)
    }catch(error){
        console.log(error)
    }
     
  };

  // Remove item completely
  const removeItem = async(id,size,quantity) => {
    try{
      const res = await removeFromCart(id,size,quantity)
      await getCart()
    }catch(error){ 
      console.log(error)
    }
  };

  // Update quantity (useful for +/- buttons)
  const updateQuantity = async(id, size, quantity) => {
    try{
      const res = await updateCart(id,size,quantity)
      await getCart()
    }catch(error){
      console.log(error)
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    const total = cart.reduce((total, item) => total + (item.quantity * item.productId.price), 0)
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        setCartCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access
export const useCart = () => useContext(CartContext);

