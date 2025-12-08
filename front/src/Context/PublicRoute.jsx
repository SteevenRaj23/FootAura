import React, { Children } from "react";
import { Navigate } from "react-router";

export default function PublicRoute({children}) {
  const authcheck = () => {
     const auth = localStorage.getItem('userName')
     console.log(auth)
     if(auth){
      return true
     }
     return false
  }
  return authcheck()?<Navigate to="/" replace/>:children;
}

// import { Navigate } from "react-router";
// import React from "react";

// export default function PublicRoute({ children }) {
//   const auth = localStorage.getItem("userName");

//   // If logged in → redirect to dashboard
//   if (auth) {
//     return <Navigate to="/" replace />;
//   }

//   // If not logged in → show login/register
//   return children;
// }
