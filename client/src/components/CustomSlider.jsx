import React from "react";
import Slider from "react-slick";
import { Product } from "../components";

const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const CustomSlider = ({ products, activeTab }) => {
  return (
    <>
      {products && (
        <Slider className="custom-slider" {...settings}>
          {products.map((product) => (
            <Product key={product._id} activeTab={activeTab} productData={product} />
          ))}
        </Slider>
      )}
    </>
  );
};

export default CustomSlider;
