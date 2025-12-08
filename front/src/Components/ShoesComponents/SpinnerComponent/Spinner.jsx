import React from "react";
import { useSpinner } from "../../../Context/SpinnerContext.jsx";

const Spinner = () => {
  const { visible } = useSpinner();

  if (!visible) return null;

  return (
    <div
      role="status"
      className="
        fixed inset-0 w-full h-full 
        bg-white/70 
        flex flex-col justify-center items-center 
        z-[9999]
      "  // === .global-spinner
    >
      <div
        className="
          w-10 h-10 
          border-4 border-gray-300 
          border-t-4 border-t-blue-700 
          rounded-full 
          animate-spin
          mb-3
        " // === .spinner
      ></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
