import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { Outlet,  useSearchParams } from "react-router-dom";

const HomeLayout = () => {
  const [sidemenu, setSideMenu] = useState(false);

  const toggleSideMenu = () => setSideMenu(!sidemenu);
  const [searchParams] = useSearchParams();
  const [ , setSideMenuOption] = useState(" ");

 
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSideMenuOption(category);
    }
  }, [searchParams]);

  return (
    <div>
      <Navbar toggleSideMenu={toggleSideMenu} setOption={setSideMenuOption} />
      <SideMenu sidemenu={sidemenu} toggleSideMenu={toggleSideMenu} />
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
