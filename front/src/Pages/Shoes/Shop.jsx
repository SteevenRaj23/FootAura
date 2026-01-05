// import { shoesData } from "../../Data/product.js";
import ProductCard from "../../Components/ShoesComponents/Cards.jsx";
import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext.jsx";
import axios from "axios";
import {getShoesData} from "../../Service/dashboardService.js"
import { useSpinner } from "../../Context/SpinnerContext.jsx";
import Display from "./Display.jsx";
import { useNavigate } from "react-router";

export default function App() {
     const {   
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice } = useCart();
      const [shoesData,setShoesData] = useState([])  
      const { showSpinner, hideSpinner } = useSpinner();
      const navi = useNavigate();

     useEffect(()=>{
         fetchData();
     },[])

     const fetchData = async() => {
      showSpinner();
       try{
         const data = await getShoesData();
         setShoesData(data.data)    
       }catch(error){
         console.log(error)
       }finally{
        hideSpinner();
       }
     }

    const displayShoeDetails = (shoe) => {
        navi(`display/${shoe._id}`)
    }
    
  return (
    <div className="flex flex-wrap gap-6 justify-center p-10">
      {shoesData.map((item,idx) => (
        <ProductCard
          key={idx}
          image={item.images[0]}
          title={item.name}
          price={item.price}
          rating={item.rating}
          onAddToCart={() => addItem(item)}       
          onclick={()=>displayShoeDetails(item)}            
        />
      ))}
    </div>
  );
}
