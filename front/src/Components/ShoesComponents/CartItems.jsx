import React from "react";
import shoes1 from "../../assets/shoes01.jpg";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartItems({ Items, updateQuantity, removeItem }) {
  return (
    <div className="flex justify-between border border-gray-200 rounded-2xl h-30 w-[800px] mt-10 ">
      <div className="flex gap-2">
        <div>
          <img src={Items.image} className="ml-4 h-25 w-25 p-1 object-contain"></img>
        </div>

        <div className="flex flex-col justify-between p-3">
          <h2 className="text-2xl  font-semibold mt-2">
            {Items.title}
          </h2>
          <div className="flex gap-5 items-center mt-3">
            <button onClick={() => updateQuantity(Items.id, Items.quantity - 1)} className="border border-gray-200 hover:bg-blue-600 hover:text-white pr-3 pl-3  rounded-xl text-lg font-bold text-black pb-1">
              -
            </button>
            <h3 className="text-lg font-semibold  text-center">{Items.quantity}</h3>
            <button onClick={() => updateQuantity(Items.id, Items.quantity + 1)} className="border border-gray-200 hover:bg-blue-600 hover:text-white pr-3 pl-3  rounded-xl text-lg font-bold text-black pb-1">
              +
            </button>
          </div>
        </div>
       </div>

      <div className="flex flex-col items-end justify-between p-6">
        <FaRegTrashAlt className="text-red-500" onClick={()=>removeItem(Items.id)}/>
        <h1 className="text-2xl font-bold">${Items.price}</h1>
      </div>
    </div>
  );
}
