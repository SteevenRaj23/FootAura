// import ProductCard from "../../Components/ShoesComponents/Cards.jsx";
// import shoe01 from "../../assets/shoes01.jpg";
// import shoe02 from "../../assets/shoes02.jpg";
// import shoe03 from "../../assets/shoes03.jpg";
// import React from "react";

// export default function App() {
//   return (
//     <div className="flex flex-wrap gap-6 justify-center p-10">
//       <ProductCard
//         image={shoe01}
//         title="Nike Air Zoom SuperRep 2"
//         price={249}
//         rating={5}
//       />
//         <ProductCard
//         image={shoe02}
//         title="Nike Air Zoom SuperRep 2"
//         price={249}
//         rating={4}
//       />
//         <ProductCard
//         image={shoe03}
//         title="Nike Air Zoom SuperRep 2"
//         price={249}
//         rating={3.5}
//       />
//         </div>
//   );
// }

import { shoesData } from "../../Data/product.js";
import ProductCard from "../../Components/ShoesComponents/Cards.jsx";
import React, { useEffect } from "react";
import { useCart } from "../../Context/CartContext.jsx";

export default function App() {
     const {   
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice } = useCart();

     useEffect(()=>{
        console.log(cart)
        console.log(getTotalItems())
        console.log(getTotalPrice())
     },[cart])
    
  return (
    <div className="flex flex-wrap gap-6 justify-center p-10">
      {shoesData.map((item) => (
        <ProductCard
          key={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
          onAddToCart={() => addItem(item)}                     
        />
      ))}
    </div>
  );
}
