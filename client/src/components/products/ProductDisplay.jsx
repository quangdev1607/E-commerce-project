import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { SelectOption } from "..";
import { apiAddToCart, apiAddWishlist } from "../../api";
import notFoundProductImg from "../../assets/image-not-available.png";
import newProduct from "../../assets/new-product.png";
import withBaseComponent from "../../hocs/withBaseComponent";
import { DetailProduct } from "../../pages/publics";
import { showModal } from "../../store/app/appSlice";
import { getCurrent } from "../../store/user/asyncActions";
import { formatCash, renderStars, roundCash } from "../../utils/helpers";
import icons from "../../utils/icons";

const ProductDisplay = ({ productData, noLabel, dispatch }) => {
  const [isShowedOption, setIsShowedOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const { FaHeart, FaEye, FaCartPlus, BsFillCartCheckFill } = icons;
  const handleClickOptions = async (e, option) => {
    e.stopPropagation();
    if (option === "CART") {
      if (!current)
        return Swal.fire({
          title: "PLease login",
          icon: "info",
        });
      const response = await apiAddToCart({
        pid: productData._id,
        color: productData?.color,
        price: productData?.price,
        title: productData?.title,
        thumbnail: productData?.thumbnail,
      });
      if (response.success) Swal.fire("Done", response.msg, "success").then(() => dispatch(getCurrent()));
      else Swal.fire("Oops", response.msg, "error");
    }
    if (option === "WISHLIST") {
      if (!current)
        return Swal.fire({
          title: "PLease login",
          icon: "info",
        });
      const response = await apiAddWishlist(productData?._id);
      if (response.success) {
        Swal.fire("Done", response.msg, "success");
        dispatch(getCurrent());
      }
    }
    if (option === "QUICKVIEW")
      dispatch(
        showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData._id }} isQuickView /> })
      );
  };
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
            <span
              title={current?.wishlist?.some((el) => el === productData._id) ? "Added" : "Add to wishlist"}
              onClick={(e) => handleClickOptions(e, "WISHLIST")}
            >
              <SelectOption
                icon={<FaHeart color={current?.wishlist?.some((el) => el._id === productData._id) ? "red" : "gray"} />}
              />
            </span>

            <span
              onClick={(e) => handleClickOptions(e, "CART")}
              title={current?.cart.some((el) => el.product._id === productData._id) ? "Added" : "Add to cart"}
            >
              <SelectOption
                icon={
                  <BsFillCartCheckFill
                    color={current?.cart.some((el) => el.product._id === productData._id) ? "red" : "gray"}
                  />
                }
              />
            </span>

            <span title="Quick view" onClick={(e) => handleClickOptions(e, "QUICKVIEW")}>
              <SelectOption icon={<FaEye />} />
            </span>
          </div>
        )}

        <img className="  w-full  object-cover " src={productData?.thumbnail || notFoundProductImg} alt="product" />

        {!noLabel && (
          <img className="absolute overflow-visible w-[130px] h-[70px] top-[2px] left-0" src={newProduct} alt="label" />
        )}

        <div className="flex flex-col gap-3 pt-5 mt-6">
          <span className="flex h-4">{renderStars(productData?.totalRatings)}</span>
          <Link
            to={`/${productData?.category.toLowerCase()}/${productData._id}/${productData?.title}`}
            className="line-clamp-1 hover:text-main"
          >
            {productData?.title}
          </Link>
          <span>{`${formatCash(roundCash(productData?.price))} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(memo(ProductDisplay));
