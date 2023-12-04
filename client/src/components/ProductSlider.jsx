import { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiGetProducts } from "../api";
import { ProductDisplay } from "../components";

const tabs = [
  { id: 1, name: "smartphone" },
  { id: 2, name: "laptop" },
  { id: 3, name: "tablet" },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const ProductSlider = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [newProducts, setNewProducts] = useState([]);
  const [smartphones, setSmartphones] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);

  const fetchNewArrivals = async () => {
    const response = await Promise.all([
      apiGetProducts({ category: "Smartphone" }),
      apiGetProducts({ category: "Laptop" }),
      apiGetProducts({ category: "Tablet" }),
    ]);
    if (response[0]?.success) {
      setSmartphones(response[0].data);
      setNewProducts(response[0].data);
    }
    if (response[1]?.success) setLaptops(response[1].data);
    if (response[2]?.success) setTablets(response[2].data);
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    if (activeTab === 1) setNewProducts(smartphones);
    if (activeTab === 2) setNewProducts(laptops);
    if (activeTab === 3) setNewProducts(tablets);
  }, [activeTab]);

  return (
    <>
      <section className="flex items-center justify-between w-full py-[15px] pr-[15px] mt-3 border-b-2 border-main">
        <span className=" uppercase font-semibold text-[20px] ">New Arrivals</span>
        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <span
              className={`pl-4 font-medium text-[#8A8A8A] text-[14px] capitalize cursor-pointer ${
                activeTab === tab.id ? "text-black" : ""
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </span>
          ))}
        </div>
      </section>
      <section className="mt-4">
        <Slider className="custom-slider" {...settings}>
          {newProducts.map((item) => (
            <ProductDisplay key={item._id} productData={item} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default ProductSlider;
