import { memo, useState } from "react";
import { SelectOption } from "..";
import notFoundProductImg from "../../assets/image-not-available.png";
import { formatCash, renderStars, roundCash } from "../../utils/helpers";
import icons from "../../utils/icons";
// import labelProduct from "../../assets/label.png";
import newProduct from "../../assets/new-product.png";

const ProductDisplay = ({ productData, activeTab, noLabel }) => {
  const [isShowedOption, setIsShowedOption] = useState(false);
  const { FaHeart, FiMenu, FaEye } = icons;
  return (
    <div className="w-full text-base py-[10px] relative">
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowedOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowedOption(false);
        }}
        className="border w-full  p-4"
      >
        {isShowedOption && (
          <div
            className={`absolute bottom-1/3 left-0 right-0 flex items-center justify-center gap-2 animate-slide-top `}
          >
            <SelectOption icon={<FaHeart />} />
            <SelectOption icon={<FiMenu />} />
            <SelectOption icon={<FaEye />} />
          </div>
        )}

        <img className="  w-full  object-contain " src={productData?.thumbnail || notFoundProductImg} alt="product" />

        {!noLabel && (
          <img className="absolute overflow-visible w-[130px] h-[70px] top-[2px] left-0" src={newProduct} alt="label" />
        )}

        <div className="flex flex-col gap-3 pt-5 mt-6">
          <span className="flex h-4">{renderStars(productData?.totalRatings)}</span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatCash(roundCash(productData?.price))} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDisplay);
