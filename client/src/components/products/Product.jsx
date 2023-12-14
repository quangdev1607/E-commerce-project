import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { SelectOption } from "..";
import notFoundProductImg from "../../assets/image-not-available.png";
import labelProduct from "../../assets/label.png";
import newProduct from "../../assets/new-product.png";
import withBaseComponent from "../../hocs/withBaseComponent";
import { formatCash, renderStars, roundCash } from "../../utils/helpers";
import icons from "../../utils/icons";
import path from "../../utils/path";

const Product = ({ productData, activeTab, navigate }) => {
  const [isShowedOption, setIsShowedOption] = useState(false);
  const { FaHeart, FiMenu, FaEye } = icons;
  const handleClickOptions = (e, option) => {
    e.stopPropagation();
    if (option === "MENU") navigate(`/${productData.category.toLowerCase()}/${productData._id}/${productData.title}`);
    if (option === "WISHLIST") console.log("Added to Wish-list");
    if (option === "QUICKVIEW") console.log("SHOW QUICKVIEW");
  };
  return (
    <div className="w-full text-base py-[10px] px-[10px] relative ">
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowedOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowedOption(false);
        }}
        className="border w-full h-[380px] p-4"
      >
        {isShowedOption && (
          <div
            className={`absolute bottom-1/3 left-0 right-0 flex items-center justify-center gap-2 animate-slide-top `}
          >
            <span onClick={(e) => handleClickOptions(e, "WISHLIST")}>
              <SelectOption icon={<FaHeart />} />
            </span>
            <span onClick={(e) => handleClickOptions(e, "MENU")}>
              <SelectOption icon={<FiMenu />} />
            </span>
            <span onClick={(e) => handleClickOptions(e, "QUICKVIEW")}>
              <SelectOption icon={<FaEye />} />
            </span>
          </div>
        )}
        <Link to={`/${productData.category.toLowerCase()}/${productData._id}/${productData.title}`}>
          <img
            className="  w-full h-[205px] object-contain "
            src={productData?.thumbnail || notFoundProductImg}
            alt="product"
          />
        </Link>

        {activeTab === 1 ? (
          <img
            className="absolute overflow-visible w-[80px] h-[60px] top-[3px] left-[7px]"
            src={labelProduct}
            alt="label"
          />
        ) : (
          <img className="absolute overflow-visible w-[130px] h-[70px] top-[2px] left-0" src={newProduct} alt="label" />
        )}

        <div className="flex flex-col gap-3 pt-3 mt-3">
          <span className="flex h-4">{renderStars(productData.totalRatings)}</span>
          <Link
            to={`/${productData.category.toLowerCase()}/${productData._id}/${productData.title}`}
            className="line-clamp-1 hover:text-main"
          >
            {productData.title}
          </Link>
          <span>{`${formatCash(roundCash(productData?.price))} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Product));
