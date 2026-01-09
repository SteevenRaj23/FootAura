import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import CartItems from "../../Components/ShoesComponents/CartItems";
import { useCart } from "../../Context/CartContext.jsx";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { payment, usdToEth } from "../../Service/Payment.js";
import Address from "./Address.jsx";
import { createOrder, verifyPayment,updatePaymentStatus } from "../../Service/cartService.js";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCart,
  } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const totalPrice = useMemo(() => {
    //  console.log("cal")
    return getTotalPrice();
  }, [cart]);

  const paymentinit = async (orderId) => {
    const ethAmount = await usdToEth(getTotalPrice()); // Convert $100 to ETH
    console.log(`Paying ${ethAmount} ETH`);
    const res = await payment(ethAmount); // Amount in ETH
    console.log("Transaction Hash:", res);
    const paymentInfo = await verifyPayment(res, ethAmount, orderId);
    console.log(paymentInfo);
    return paymentInfo;
  };

  const handleAddressSubmit = async (data) => {
    try {
      const res = await createOrder(data);
      const paymentdetails = await paymentinit(res._id);
      if ((paymentdetails.message = "Ganache payment verified!")) {
        await updatePaymentStatus(res._id);
      }
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Address
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddressSubmit}
      />

      <div className="p-5">
        <Link to="/" className="flex items-center gap-3 cursor-pointer mb-10">
          <FaArrowLeft
            className="ml-4 mt-4 text-base cursor-pointer"
            color="gray"
          />
          <h3 className="text-lg font-semibold text-gray-400 text-center mt-4">
            Continue Shopping
          </h3>
        </Link>

        <h1 className="text-4xl font-bold mt-4 ml-4">Shopping Cart</h1>

        <div className="flex">
          <div className="flex flex-col">
            {cart.map((e) => (
              <CartItems
                key={e.productId._id}
                Items={e}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <div className="border border-gray-200 rounded-2xl h-80 w-[400px] m-10 p-5">
            <h1 className="text-2xl font-semibold">Order Summary</h1>

            <div className="mt-3">
              <hr className="border-gray-200" />
              <div className="mt-2 mb-2">
                <div className="flex justify-between">
                  <h3 className="text-lg text-gray-500">Subtotal</h3>
                  <h3 className="text-lg text-gray-500">${totalPrice}</h3>
                </div>
                <div className="flex justify-between mt-4">
                  <h3 className="text-lg text-gray-500">Shipping</h3>
                  <h3 className="text-lg text-gray-500">Free</h3>
                </div>
                <div className="flex justify-between mt-4">
                  <h3 className="text-lg text-gray-500">Tax</h3>
                  <h3 className="text-lg text-gray-500">
                    ${(totalPrice * 0.15).toFixed(2)}
                  </h3>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>

            <div className="flex justify-between mt-2">
              <h1 className="text-2xl font-semibold">Total</h1>
              <h1 className="text-2xl font-semibold">
                ${(totalPrice + totalPrice * 0.15).toFixed(2)}
              </h1>
            </div>

            <button
              className="mt-3 text-white bg-blue-600 hover:bg-blue-700 box-border border rounded-xl border-transparent focus:ring-4 focus:ring-blue-500 shadow-xs font-medium leading-5 rounded-base text-base px-25 py-3 focus:outline-none"
              onClick={() => setOpen(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
