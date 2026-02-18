import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/productsService";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ sidemenu, toggleSideMenu }) => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigate();

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
  console.log(sidemenu);
  return (
    <div
      // ref={menuRef}
      className="overflow-scroll position-fixed bg-white shadow w-sm-50"
      style={{
        top: "77.7px",
        left: 0,
        width: "25%",
        height: "calc(100vh - 77.7px)",
        transform: sidemenu ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 1050,
      }}
    >
      <h2 className="text-primary p-4">Categories</h2>
      <ul className="list-group list-group-flush  ">
        {categories.map((category, index) => (
          <li
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              // setOption(category);
              navigation(`/?category=${category}`);
              toggleSideMenu();
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
