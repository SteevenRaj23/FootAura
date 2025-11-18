import React from 'react'
import ChildA from './Context/ChildA/ChildA'
import Hook from './Hook/Hook'
import Splitting from './Splitting/Splitting'

export default function Week1() {
  return (
    <>
    <div>
      <ChildA />
    </div> 
    <div className=''></div>
    <div>
       <Hook/>
    </div>
    <div>
      <Splitting/>
    </div>
    </>
  )
}


