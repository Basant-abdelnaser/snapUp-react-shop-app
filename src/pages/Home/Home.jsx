import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productsService";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [sidemenu, setSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sideMenuOption, setSideMenuOption] = useState("");

  // Toggle side menu
  const toggleSideMenu = () => setSideMenu(!sidemenu);

  // Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))];

   const location = useLocation();

   // get query string
   const query = new URLSearchParams(location.search).get("query") || "";

   // filter products
//    const filteredProducts = products.filter((p) =>
//      p.title.toLowerCase().includes(query.toLowerCase()),
//    );

  return (
    <div>
      <Navbar toggleSideMenu={toggleSideMenu} setOption={setSideMenuOption} />
      <SideMenu
        sidemenu={sidemenu}
        setOption={setSideMenuOption}
        toggleSideMenu={toggleSideMenu}
      />

      <div className="container py-5" style={{ marginTop: "70px" }}>
        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

        {/* Show all categories */}
        {!loading &&
          sideMenuOption === "" &&
          categories.map((category) => {
            const filteredProducts = products.filter(
              (product) => product.category === category,
            );

            return (
              <div key={category} className="mb-5">
                <h3 className="mb-4 text-capitalize border-bottom pb-2 text-primary">
                  {category}
                </h3>

                {filteredProducts.length === 0 ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "20vh" }}
                  >
                    <h5 className="text-muted">No products found</h5>
                  </div>
                ) : (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {filteredProducts.map((product) => (
                      <div className="col" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        {/* Show single category */}
        {!loading &&
          sideMenuOption !== "" &&
          (() => {
            const filteredProducts = products.filter(
              (product) => product.category === sideMenuOption,
            );
            return (
              <div>
                <h3 className="mb-4 text-capitalize border-bottom pb-2 text-primary">
                  {sideMenuOption}
                </h3>

                {filteredProducts.length === 0 ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "20vh" }}
                  >
                    <h5 className="text-muted">No products found</h5>
                  </div>
                ) : (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {filteredProducts.map((product) => (
                      <div className="col" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
      </div>
    </div>
  );
};

export default Home;
