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
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3 fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex" to="/">
          <div onClick={toggleSideMenu}>
            <CgMenuRight size={35} className="me-2 text-primary" />
          </div>
          Snap<span className="fw-bold text-primary">Up</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {firstFour.map((category, index) => (
              <li className="nav-item" key={index}>
                <div
                  className="nav-link"
                  onClick={() => {
                    navigate("/");
                    setOption(category);

                    // navigate("/", { state: { category } });
                    navigate(`/?category=${category}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {category}
                </div>
              </li>
            ))}
          </ul>
          <form
            className="d-flex w-50 align-items-center"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success  me-2" type="submit">
              Search
            </button>

            <div
              className=" position-relative"
              onClick={() => {
                navigate("/cart");
              }}
              style={{ cursor: "pointer" }}
            >
              <MdOutlineShoppingCart size={40} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {cartItems.length}
              </span>
            </div>
            <div className="ms-4">
              <Link
                to={"/login"}
                className="text-primary fw-bold"
                style={{ textDecoration: "none", fontSize: "20px" }}
              >
                {" "}
                {isAuthenticated ? "Logout" : "Login"}
              </Link>
            </div>
            <div className="ms-4">
              <p className="text-white bg-primary rounded p-2">
                {isAuthenticated ? user.username : "Guest"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
