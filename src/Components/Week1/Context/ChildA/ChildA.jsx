import React, { useContext } from 'react'
import { useCount } from '../Parent';

export default function ChildA() {
    const { count,setCount } = useCount();
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <h2 className='text-4xl font-bold'>Child A Component</h2>
        <p className='mt-10 text-2xl font-bold mb-10'>Count from Context: {count}</p>
        <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
         onClick={() => setCount(count + 1)}>Increment</button>
          <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
         onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}
