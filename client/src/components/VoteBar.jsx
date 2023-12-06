import { useEffect, useRef } from "react";
import icons from "../utils/icons";

const VoteBar = ({ number, ratingCounts, ratingTotal }) => {
  const { AiFillStar } = icons;
  const percentRef = useRef();
  const percent = Math.round((ratingCounts * 100) / ratingTotal) || 0;
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCounts, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm ">
      <div className=" w-[5%] flex  items-center  gap-1 ">
        <span className="font-medium min-w-[9px]">{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[80%]">
        <div className="relative w-full h-[6px] bg-gray-200 rounded-l-full rounded-r-full">
          <div ref={percentRef} className="absolute inset-0 bg-main rounded-l-full rounded-r-full"></div>
        </div>
      </div>
      <div className="w-[15%] text-sm text-gray-500 flex-2">{`${ratingCounts || 0} reviews`}</div>
    </div>
  );
};

export default VoteBar;
