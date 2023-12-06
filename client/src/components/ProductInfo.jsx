import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiRatingProduct } from "../api";
import { Button, Rating, RatingSection, VoteBar } from "../components";
import { showModal } from "../store/app/appSlice";
import { productsInfo } from "../utils/constants";
import { renderStars } from "../utils/helpers";
import path from "../utils/path";

const activeStyles = "bg-white border border-b-0";
const notActiveStyles = "bg-gray-200 ";

const ProductInfo = ({ totalRatings, totalReviews, productName, pid, handleRerender }) => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleSubmitRatingProduct = useCallback(async ({ comment, star }) => {
    if (!comment || !star) {
      alert("Missing inputs");
      return;
    }
    await apiRatingProduct({ star, comment, pid });
    handleRerender();
    dispatch(showModal({ isShowModal: false, modaChildren: null }));
  });
  const handleShowRatingSection = () => {
    if (!isLoggedIn) {
      Swal.fire({
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Login",
        title: "Oops!",
        text: "You need to login to review this product",
        icon: "warning",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <RatingSection productName={productName} handleSubmitRatingProduct={handleSubmitRatingProduct} />
          ),
        })
      );
    }
  };

  return (
    <div className=" flex flex-col">
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
        <div
          onClick={() => setActiveTab(5)}
          key={5}
          className={`uppercase p-2 cursor-pointer text-lg  font-normal ${
            activeTab === 5 ? activeStyles : notActiveStyles
          }`}
        >
          CUSTOMER REVIEW
        </div>
      </div>
      <div className=" py-4 border">
        <div className=" font-normal">
          {productsInfo.some((el) => el.id === activeTab) && productsInfo[activeTab - 1].content}
          {activeTab === 5 && (
            // --------------------------------------------------
            <>
              <div className="flex">
                <div className="flex flex-col flex-4 gap-1  items-center justify-center  border border-red-500">
                  <span className="text-2xl font-semibold">{`${totalRatings}/5`}</span>
                  <span className="flex gap-3">{renderStars(totalRatings)}</span>
                  <span className="underline font-medium text-sm">{`${totalReviews.length} reviews`}</span>
                </div>
                {/* --------------------------------------------------------------- */}
                <div className="flex-6 border flex flex-col p-4 border-red-500">
                  {Array.from(Array(5).keys())
                    .reverse()
                    .map((el) => (
                      <VoteBar
                        ratingTotal={totalReviews?.length}
                        ratingCounts={totalReviews?.filter((i) => i.star === el + 1)?.length}
                        key={el}
                        number={el + 1}
                      />
                    ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 gap-2">
                <span>How do you rate this product?</span>
                <Button handleOnClick={() => handleShowRatingSection()} name="Rate now" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfo);
