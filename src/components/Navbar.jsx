import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/productsService";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg";
import { useSelector } from "react-redux";

const Navbar = ({ toggleSideMenu, setOption }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/?query=${searchTerm}`);
  };
  const firstFour = categories.slice(0, 4);
  const cartItems = useSelector((state) => state.cart.items || []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm p-3">
      <div className="container">
        {/* Logo + Menu */}
        <div className="d-flex align-items-center">
          <div onClick={toggleSideMenu} style={{ cursor: "pointer" }}>
            <CgMenuRight size={30} className="me-2 text-primary" />
          </div>

          <Link className="navbar-brand mb-0" to="/">
            Snap<span className="fw-bold text-primary">Up</span>
          </Link>
        </div>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Categories */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {firstFour.map((category, index) => (
              <li className="nav-item" key={index}>
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/?category=${category}`)}
                >
                  {category}
                </span>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 w-100 w-lg-auto">
            {/* Search */}
            <form className="d-flex w-100 w-lg-auto" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>

            {/* Cart */}
            <div
              className="position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/cart")}
            >
              <MdOutlineShoppingCart size={30} />
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Auth */}
            <Link
              to="/login"
              className="text-decoration-none fw-bold text-primary"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Link>

            {/* Username */}
            <span className="badge bg-primary">
              {isAuthenticated ? user.username : "Guest"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
