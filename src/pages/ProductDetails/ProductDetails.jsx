import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productsService";
import { BsCartCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk, deleteItemThunk } from "../../redux/cartSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const calcRealPrice = (price, discountPercentage) => {
    return (price + price * discountPercentage).toFixed(2);
  };
  const dispatch = useDispatch();

  const isInCart = useSelector((state) =>
    state.cart.items.some((item) => item.id === Number(id)),
  );

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
    return () => {
      setProduct(null);
    };
  }, [id]);

  return (
    <div className="container py-5  mt-2  ">
      {loading && (
        <div className="text-center py-5 ">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {product && (
        <div className="row g-5 border p-2 rounded">
          {/* LEFT SIDE - IMAGES */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <img
                src={product.images[0]}
                alt={product.title}
                className="img-fluid rounded"
                style={{ height: "450px", objectFit: "cover" }}
              />
            </div>

            {/* Thumbnails */}
            <div className="d-flex gap-3 mt-3">
              {product.images.slice(0, 4).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  className="img-thumbnail"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="col-md-6">
            <h2 className="fw-bold">{product.title}</h2>

            <p className="text-muted">{product.description}</p>

            <div className="mb-2">
              <span className="  me-2">
                <span className="text-primary fw-bold">Category : </span>
                {product.category} |
              </span>
              <span className="text-muted">
                <span className="text-primary fw-bold">Brand : </span>
                {product.brand} |
              </span>
              <span className="text-muted">
                <span className="text-primary fw-bold"> Rating : </span>
                {product.rating}
              </span>
            </div>

            {/* Price Section */}
            <div className="mb-5 mt-4">
              <h3 className="text-primary fw-bold ">${product.price}</h3>
              <del className="text-muted mb-2">
                ${calcRealPrice(product.price, product.discountPercentage)}
              </del>
              <span className="text-success ms-2">
                {product.discountPercentage}% OFF
              </span>
              <p className="text-muted small">Inclusive of all taxes</p>
            </div>

            {/* Quantity */}
            <div className="d-flex align-items-center mb-4">
              <span className="me-3 fw-semibold">Quantity:</span>
              <div className="input-group" style={{ width: "140px" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    if (quantity > 1) setQuantity((prev) => prev - 1);
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3">
              <button
                className={`btn ${isInCart ? "btn-danger" : "btn-success"} px-5 py-2 d-flex align-items-center`}
                onClick={() => {
                  isInCart
                    ? dispatch(deleteItemThunk(product.id))
                    : dispatch(addToCartThunk({ product, quantity }));
                }}
              >
                <BsCartCheck className="me-2" />{" "}
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button className="btn btn-primary px-5 py-2">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
