import React from "react";
import carousel1 from "../Assets/Images/vecteezy_a-woman-in-a-yellow-dress-holding-shopping-bags_70314344.jpg";
import carousel2 from "../Assets/Images/vecteezy_happy-young-woman-shopping-with-bags-in-summer-gray-backdrop_27185986.jpg";
import carousel3 from "../Assets/Images/vecteezy_woman-in-pink-dress-holding-shopping-bags_70314307.jpg";
const Carousel = () => {
  return (
    <div className="container" style={{ marginTop: "70px" }}>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ height: "300px" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={carousel1}
              className="d-block w-100"
              alt="..."
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel2}
              className="d-block w-100"
              alt="..."
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel3}
              className="d-block w-100"
              alt="..."
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
