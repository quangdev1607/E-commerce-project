import { memo, useEffect, useState } from "react";

import { CustomSlider } from "..";
import { apiGetProducts } from "../../api";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await Promise.all([apiGetProducts({ sort: "-sold" }), apiGetProducts()]);
    if (response[0]?.success) {
      setBestSellers(response[0].data);
      setProducts(response[0].data);
    }
    if (response[1]?.success) setNewProducts(response[1].data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 1) setProducts(bestSellers);
    if (activeTab === 2) setProducts(newProducts);
  }, [activeTab]);
  return (
    <div>
      <div className="flex border-b-2 gap-8 border-main pb-4 mb-5">
        {tabs.map((tab) => (
          <span
            key={tab.id}
            className={`font-semibold text-[#8A8A8A] text-[20px] uppercase cursor-pointer ${
              activeTab === tab.id ? "text-black" : ""
            } `}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <CustomSlider products={products} activeTab={activeTab} />
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="relative">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt="banner2"
          />
          <div className="absolute left-0 right-0 top-0 bg-[#ccc] opacity-0 hover:opacity-25 z-10 bottom-0 cursor-pointer "></div>
        </div>

        <div className="relative">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
            alt="banner1"
          />
          <div className="absolute left-0 right-0 top-0 bg-[#ccc] opacity-0 hover:opacity-25 z-10 bottom-0 cursor-pointer "></div>
        </div>
      </div>
    </div>
  );
};

export default memo(BestSeller);
