import React, { useContext,useState } from 'react'
import { createContext } from 'react'
import ChildA from './ChildA/ChildA'

const ContextData = createContext()

export const useCount =() => useContext(ContextData);

export default function Parent({children}) {
   const[count,setCount] = useState(0)

  return (
    <ContextData.Provider value={{count,setCount}}>
      {children}
    </ContextData.Provider>
  )
}

