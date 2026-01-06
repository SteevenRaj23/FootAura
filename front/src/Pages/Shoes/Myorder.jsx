import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {getMyOrders} from "../../Service/cartService.js";


const statusStyles = {
  shipped: "bg-green-100 text-green-700",
  processing : "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  delivered: "bg-gray-200 text-gray-600",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchorders()
  }, []);

  const fetchorders = async() => {
    try {
      const data = await getMyOrders();
      console.log(data);
        setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }


  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm border p-6"
              >
                {/* Header */}
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium text-gray-800">
                      #{order._id}
                    </p>
                  </div>

                  <span
                    className={`py-3 px-3 rounded-2xl text-sm font-medium
                      ${statusStyles[order.orderStatus]}`}
                  >
                    {order.orderStatus.replace("_", " ")}
                  </span>
                </div>

                {/* Body */}
                <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
                  <div>
                    <p className="font-medium mb-1">Shipping Address</p>
                    <p>
                      {order.shippingAddress.house},<br />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} –{" "}
                      {order.shippingAddress.pincode}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Order Date</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Total Amount</p>
                    <p className="text-lg font-semibold">
                      ${order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Actions */} 
                <div className="flex justify-end gap-3 mt-6">
                  {order.paymentStatus === "pending" ||
                  order.paymentStatus === "failed" ? (
                    <button
                      className="px-4 py-2 rounded-lg bg-[#FDE68A] text-gray-800
                                 hover:bg-[#FCD34D] transition"
                      onClick={() => console.log("Retry payment", order._id)}
                    >
                      Retry Payment
                    </button>
                  ) : null}

                  <button
                    className="px-4 py-2 rounded-lg border text-gray-600
                               hover:bg-gray-100 transition"
                    onClick={() => console.log("View order", order._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
