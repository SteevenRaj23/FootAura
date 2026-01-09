
<img width="1465" height="694" alt="ChatGPT Image Jan 6, 2026, 03_28_56 PM" src="https://github.com/user-attachments/assets/77a2306a-4cab-4022-92bb-951b17b3c80b" />

## 🔐 Authentication
- **POST** `/userregister` – Register new user  
- **POST** `/login` – User login

---

## 📦 Products
- **POST** `/product` – Create product  
- **GET** `/product` – Get all products  
- **PUT** `/updateById/:id` – Update product by ID  
- **DELETE** `/product/:id` – Delete product by ID  

---

## 🛍 Cart
- **POST** `/add-to-cart` – Add item to cart  
- **PUT** `/update-to-cart` – Update cart item  
- **GET** `/getcart` – Get user cart  
- **DELETE** `/cart/:id` – Remove item from cart  

---

## 📑 Orders
- **POST** `/createorder` – Create order  
- **GET** `/myorder` – Get my orders  
- **PATCH** `/updateorderStatusById/:id` – Update order status  
