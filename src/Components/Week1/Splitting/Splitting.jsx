import React, { Suspense, useState } from "react";
import { lazy } from "react";

const Heavy = lazy(() => import("./Heavy"));

export default function Splitting() {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-10">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => setShow(!show)}
      >
        load Lazy Component
      </button>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <Heavy />
        </Suspense>
      )}
    </div>
  );
}
