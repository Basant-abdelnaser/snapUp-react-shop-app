import "./App.css";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp/Signup";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;
