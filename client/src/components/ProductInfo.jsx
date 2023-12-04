import { memo, useState } from "react";
import { productsInfo } from "../utils/constants";

const activeStyles = "bg-white border border-b-0";
const notActiveStyles = "bg-gray-200 ";
const ProductInfo = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="flex flex-col">
      <div className="flex justify-start gap-2 items-center relative bottom-[-1px]">
        {productsInfo.map((item) => (
          <span
            onClick={() => setActiveTab(item.id)}
            key={item.id}
            className={`uppercase p-2 cursor-pointer text-lg  font-normal ${
              activeTab === item.id ? activeStyles : notActiveStyles
            }`}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className=" py-4 border">
        <span className=" font-normal">
          {productsInfo.some((el) => el.id === activeTab) && productsInfo[activeTab - 1].content}
        </span>
      </div>
    </div>
  );
};

export default memo(ProductInfo);
