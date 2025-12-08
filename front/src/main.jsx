import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import Parent from './Components/Week1/Context/Parent.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import {SpinnerProvider} from './Context/SpinnerContext.jsx'

createRoot(document.getElementById('root')).render(
    <CartProvider>
    <SpinnerProvider>
    <Parent>
        <App />
    </Parent>
    </SpinnerProvider>
    </CartProvider>

)


// import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import Parent from './Components/Week1/Context/Parent.jsx';

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <StrictMode>
//     <Parent>
//       <App />
//     </Parent>
//   </StrictMode>
// );
