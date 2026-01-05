import { createContext, useContext, useEffect, useState } from "react";
import {getCartData, addToCart, removeFromCart} from "../Service/cartService.js"
import React from "react";

const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount,setCartCount] = useState(0);

  useEffect(()=>{
    console.log("hi context")
    getCart();
  },[])

  useEffect(()=>{
    console.log("cart updated:",cart)
  },[cart])
  

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
  const addItem = async(product) => {
    try{
        const res = await addToCart(product._id,product.sizes[0].size,1)
        console.log(res)
    }catch(error){
        console.log(error)
    }
     
  };

  // Remove item completely
  const removeItem = async(id,size,quantity) => {
    try{
      const res = await removeFromCart(id,size,quantity)
      console.log(res)
      await getCart()
    }catch(error){ 
      console.log(error)
    }
    console.log(id,size,quantity);
  };

  // Update quantity (useful for +/- buttons)
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
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
    // return cart.reduce(
    //   (total, item) => total + item.quantity * item.price,
    //   0
    // );
    return 0;
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

