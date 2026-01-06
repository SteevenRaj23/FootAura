import React from "react";

// export default function Address() {
//   return (
//     <div
//       className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-1000"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//     >
//       <div className="bg-white rounded-lg shadow-2xl w-[45%] max-w-7xl max-h-[90vh] overflow-hidden">
//         <h1>Address</h1>
//       </div>
//     </div>
//   );
// }


import { motion, AnimatePresence } from "framer-motion";

export default function ShippingAddressModal({
  open,
  onClose,
  onSubmit
}) {
  const [address, setAddress] = React.useState({
    house: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({ address });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>

            <div className="space-y-4">
              <input
                name="house"
                placeholder="House / Street"
                value={address.house}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E8B86D] outline-none"
              />

              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E8B86D] outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E8B86D] outline-none"
                />

                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E8B86D] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FDE68A] to-[#FCA5A5]
                           font-medium text-gray-800 shadow hover:shadow-md"
              >
                Pay
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
