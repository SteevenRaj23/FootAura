import { createContext, useContext, useState } from "react";
import React from "react";

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showSpinner = () => setVisible(true);
  const hideSpinner = () => setVisible(false);

  return (
    <SpinnerContext.Provider value={{ visible, showSpinner, hideSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);
