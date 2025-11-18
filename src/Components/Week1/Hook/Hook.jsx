import React, { use } from "react";
import { useEffect, useState, useRef,useMemo } from "react";
import { useCount } from "../Context/Parent";


const ExpensiveComponent  = () => {
 
  const sum = () => {
    console.log("Calculating sum...");
    let i=0;
    for(i=0;i<1e8;i++){
      i = i+1;
    }
    return i;
  }

  const total =  useMemo (()=>{
   return sum();
  },[])

  // const total = sum();

  return (
    <p>Sum:{total}</p>
  )
}

export default function Hook() {
  const [seconds, setSeconds] = useState(0);
  const [counter, setcounter] = useState(0);
  const [memoValue, setMemoValue] = useState(8);
  const { count, setCount } = useCount(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "yellow";
  };


    
  


  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-4xl font-bold">Hooks</h2>
      </div>

      <div className="flex justify-around mt-4">
        {/* Use State */}
        <div className="mt-5 flex flex-col items-center">
          <h2 className="text-2xl font-bold">UseState</h2>
          <p className="mt-2">counter: {counter}</p>

          <div className="mt-1">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => setcounter(counter + 1)}
            >
              Increment
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => setcounter(counter - 1)}
            >
              Decrement
            </button>
          </div>
        </div>

        {/* Use Effect */}
        <div className="mt-5 flex flex-col items-center">
          <h2 className="text-2xl font-bold">UseEffect</h2>
          <p className="mt-2">Time: {seconds}s</p>
        </div>

        {/* context api */}
        <div className="mt-5 ">
          <h2 className="text-2xl text-center font-bold mb-2">Context API</h2>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </button>
        </div>
      </div>

      <div>
        <div className="mt-5 flex flex-col items-center">
          <h2 className="text-2xl font-bold">UseRef</h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter something..."
              className=" p-2 border border-gray-300 rounded"
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleFocus}
            >
              Focus Input
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-10">
         <ExpensiveComponent />
      <button
        onClick={() => setCount(count + 1)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Re-render Parent
      </button>
      <p>Parent re-renders: {count}</p>
      </div>
    </>
  );
}
