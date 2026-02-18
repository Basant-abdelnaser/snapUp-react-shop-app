Mini E-Commerce Store

A modern eCommerce web application built using React, Redux, and Bootstrap, powered by the DummyJSON API for product data.

🚀 Live Demo

https://snapupshop.netlify.app/

🛠️ Built With

⚛️ React

🗂️ Redux (State Management)

🎨 Bootstrap 5

🌐 DummyJSON API

🔄 React Router

✨ Features

 Browse all products

Filter products by category

 Search functionality

Add / Remove items from cart

 Increase / Decrease quantity

 Cart persistence

 View product details

Responsive design

Category filtering via URL query params

API Used

Data is fetched from:

👉 https://dummyjson.com

Examples:

Get all products
https://dummyjson.com/products

Get categories
https://dummyjson.com/products/categories

Filter by category
https://dummyjson.com/products/category/{category}

🗂️ Project Structure
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── SideMenu.jsx
│   ├── ProductCard.jsx
│   ├── Cart.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│
├── redux/
│   ├── store.js
│   ├── cartSlice.js
│
├── services/
│   ├── productsService.js
│
└── App.js

State Management

Redux is used for:

Managing cart items

Updating quantities

Removing products

Persisting cart data

📦 Installation
git clone https://github.com/Basant-abde;naser/snapUp-react-shop-app.git
cd snapUp-react-shop-app
npm install
npm start

 Future Improvements


💳 Checkout & Payment Integration

❤️ Wishlist Feature

🧾 Order History

🔎 Advanced filtering & sorting

👩‍💻 Author

Basant Abdelnaser
Frontend Developer



