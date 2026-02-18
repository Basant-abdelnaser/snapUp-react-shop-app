import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp/Signup";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import HomeLayout from "./pages/HomeLayount";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCartThunk } from "./redux/cartSlice";
import Cart from "./pages/Cart/Cart";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        {/* Layout routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;
