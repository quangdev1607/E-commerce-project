import { memo, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "../components";
import { ratingOptions } from "../utils/constants";
import icons from "../utils/icons";
const RatingSection = ({ productName, handleSubmitRatingProduct }) => {
  const { AiFillStar, AiOutlineStar } = icons;

  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  const modalRef = useRef();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px]  flex flex-col  justify-center gap-4 p-4"
    >
      <div className="flex p-4 flex-1 items-center justify-center">
        <img className="w-[300px] object-contain" src={logo} alt="logo" />
      </div>
      <div className="flex-6 p-4">
        <label htmlFor="rating" className="text-xl font-medium block mb-2  text-gray-900">
          {`Rate ${productName}:`}
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          id="rating"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Type your opinions"
        ></textarea>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 border-t-4 p-4 flex-3">
        <p className="text-base font-medium">How do you like this product?</p>
        <div className="flex items-center justify-center gap-4">
          {ratingOptions.map((el) => (
            <div
              onClick={() => setSelectedRating(el.id)}
              className="w-[100px] h-[65px] bg-gray-200 cursor-pointer hover:bg-gray-100 flex flex-col gap-2 items-center justify-center "
              key={el.id}
            >
              {el.id <= selectedRating ? <AiFillStar color="red" /> : <AiOutlineStar />}
              <span className="  text-center whitespace-nowrap">{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button handleOnClick={() => handleSubmitRatingProduct({ comment, star: selectedRating })} name="Submit" />
    </div>
  );
};

export default memo(RatingSection);
