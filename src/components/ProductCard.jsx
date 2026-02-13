import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const calcRealPrice = (price, discountPercentage) => {
    return (price + price * discountPercentage).toFixed(2);
  };

  return (
    <div
      className="product-card-wrapper  "
      style={{ width: "17rem", height: "27rem" }}
    >
      <div
        className="card position-relative product-card h-100 border rounded"
        style={{ width: "17rem", height: "27rem" }}
      >
        {/* Image */}
        <div className="image-container">
          <img
            src={product.images[0]}
            className="card-img-top product-img"
            alt={product.title}
          />
        </div>

        {/* Category Badge */}
        <span className="position-absolute top-0 start-0 m-2 bg-primary text-white px-3 py-1 rounded-pill text-center">
          {product.category}
        </span>

        {/* Body */}
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted">Brand: {product.brand}</p>

          <div className="d-flex justify-content-between align-items-center">
            <del className="text-muted">
              ${calcRealPrice(product.price, product.discountPercentage)}
            </del>
            <span className="fs-5 fw-bold">${product.price}</span>
            <span className="text-primary">
              ({product.discountPercentage}%)
            </span>
          </div>
        </div>

        {/* Hover Button */}
        <div className="hover-btn">
          <button className="btn btn-primary w-100">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
