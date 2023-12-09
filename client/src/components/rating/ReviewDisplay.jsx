import moment from "moment";
import { memo } from "react";
import avatarDefault from "../../assets/avatar-default.jpg";
import { renderStars } from "../../utils/helpers";
const ReviewDisplay = ({ image = avatarDefault, name = "Anonymous", updatedAt, star, comment }) => {
  return (
    <div className="flex items-center py-3">
      <div className="p-4 flex-none">
        <img className="w-[80px] h-[80px] rounded-full object-cover" src={image} alt="avatar" />
      </div>
      <div className="flex flex-col flex-auto gap-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-lg">{`${name.firstname} ${name.lastname}`}</h3>
          <span className="font-light text-xs">{moment(updatedAt)?.fromNow()}</span>
        </div>
        <div className="flex">
          <span className="flex">{renderStars(star)}</span>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <span className="p-3 bg-gray-200">{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ReviewDisplay);
