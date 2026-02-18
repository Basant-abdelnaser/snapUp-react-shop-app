# 🛍️ SnapUp – Mini E-Commerce Store

A modern and responsive eCommerce web application built with **React** and **Redux**, styled using **Bootstrap 5**, and powered by the **DummyJSON API** for dynamic product data.

The application demonstrates core eCommerce functionality including product browsing, category filtering, cart management, and state persistence.

---

## 🚀 Live Demo

🔗 https://snapupshop.netlify.app/

---

## 🧰 Tech Stack

- **React** – Component-based UI development  
- **Redux Toolkit** – Global state management  
- **React Router** – Client-side routing  
- **Bootstrap 5** – Responsive UI styling  
- **DummyJSON API** – Mock backend for products data  

---

## ✨ Key Features

### 🛒 Product Management
- Browse all available products
- View detailed product information
- Filter products by category
- Search products by name
- Category filtering via URL query parameters (`?category=`)

### 🧺 Cart Functionality
- Add items to cart
- Remove items from cart
- Increase / decrease product quantity
- Real-time total price calculation
- Cart state persistence

### 🎨 UI & UX
- Fully responsive design
- Clean Bootstrap layout
- Side menu with overlay interaction
- Smooth navigation experience

---

## 🌐 API Integration

All product data is fetched dynamically from:

🔗 https://dummyjson.com

### Example Endpoints

| Purpose | Endpoint |
|---------|----------|
| Get all products | `https://dummyjson.com/products` |
| Get categories | `https://dummyjson.com/products/categories` |
| Filter by category | `https://dummyjson.com/products/category/{category}` |




---

## 🧠 State Management (Redux)

Redux is used to:

- Manage cart items globally
- Handle quantity updates
- Remove products from cart
- Maintain application state consistency

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/Basant-abdelnaser/snapUp-react-shop-app.git
cd snapUp-react-shop-app
npm install
npm start
```
The app will run locally at:
```bash 
 http://localhost:3000
```
🔮 Future Enhancements

💳 Checkout & payment integration

❤️ Wishlist feature

🧾 Order history

🔎 Advanced filtering & sorting


