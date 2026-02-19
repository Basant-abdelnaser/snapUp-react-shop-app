import React, { useEffect, useState } from "react";

import SideMenu from "../../components/SideMenu";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productsService";
import { useLocation, useSearchParams } from "react-router-dom";
import Carousel from "../../components/Carousel";

const Home = () => {
  const [sidemenu, setSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sideMenuOption, setSideMenuOption] = useState("");
  // const menuRef = useRef();

  const toggleSideMenu = () => setSideMenu(!sidemenu);
  const location = useLocation();

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

  const categories = [...new Set(products.map((p) => p.category))];

  const query = new URLSearchParams(location.search).get("query") || "";

  // ⭐ UPDATED: search filter applied first
  const filteredBySearch = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  // ⭐ UPDATED: final filter combines search + category
  const finalProducts =
    sideMenuOption !== ""
      ? filteredBySearch.filter(
          (product) => product.category === sideMenuOption,
        )
      : filteredBySearch;

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSideMenuOption(categoryFromUrl);
    }
  }, [searchParams]);
  return (
    <div>
      {/* <Navbar toggleSideMenu={toggleSideMenu} setOption={setSideMenuOption} /> */}

      <SideMenu
        sidemenu={sidemenu}
        toggleSideMenu={toggleSideMenu}
        // menuRef={menuRef}
      />
      <Carousel />

      <div className="container py-5" style={{ marginTop: "70px" }}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

        {/* UPDATED: If search exists show search results only */}
        {!loading && query && (
          <div>
            <h3 className="mb-4 border-bottom pb-2 text-primary">
              Search results for "{query}"
            </h3>

            {finalProducts.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted">No products found</h5>
              </div>
            ) : (
              <div className="row  justify-content-center justify-content-lg-start g-4">
                {finalProducts.map((product) => (
                  <div className="col" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPDATED: Normal category rendering only if no search */}
        {!loading &&
          !query &&
          sideMenuOption === "" &&
          categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category,
            );

            return (
              <div key={category} className="mb-5">
                <h3 className="mb-4 text-capitalize border-bottom p-3 text-primary bg-body-secondary">
                  {category}
                </h3>

                <div className="row  justify-content-center justify-content-lg-start g-4">
                  {categoryProducts.map((product) => (
                    <div className="col-auto" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        {/* UPDATED: Single category if selected and no search */}
        {!loading && !query && sideMenuOption !== "" && (
          <div>
            <h3 className="mb-4 text-capitalize border-bottom pb-2 text-primary">
              {sideMenuOption}
            </h3>

            {finalProducts.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted">No products found</h5>
              </div>
            ) : (
              <div className="row  justify-content-center justify-content-lg-start g-4">
                {finalProducts.map((product) => (
                  <div className="col-auto" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
