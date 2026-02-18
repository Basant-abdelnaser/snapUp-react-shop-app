import { useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const [sidemenu, setSideMenu] = useState(false);

  const toggleSideMenu = () => setSideMenu(!sidemenu);

  return (
    <div>
      <Navbar toggleSideMenu={toggleSideMenu} />
      <SideMenu sidemenu={sidemenu} toggleSideMenu={toggleSideMenu} />
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
