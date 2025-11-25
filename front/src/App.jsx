import { Suspense, useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Parent from "./Components/Week1/Context/Parent";
import Week1 from "./Components/Week1/Week1";
import Dashboard from "./Pages/Dashboard";
// import Help from "./Pages/Help";
import Cart from "./Pages/Shoes/Cart";
import NavBar from "./Pages/NavBar";
import { lazy } from "react";
import ShoesDashboard from "./Pages/Shoes/ShoesDashboard";

const Help = lazy(() => import("./Pages/Help"));

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<ShoesDashboard/>} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/week1" element={<Week1 />} />
          <Route
            path="/Help" 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Help />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
