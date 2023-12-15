import { memo } from "react";
import icons from "../../utils/icons";

const SelectQuantity = ({ quantity, handleQuantity, handleQuantityButton }) => {
  const { FaMinus, FaPlus } = icons;
  return (
    <div className="flex gap-4 items-center">
      <FaMinus onClick={() => handleQuantityButton("minus")} className="cursor-pointer" />
      <input
        onChange={(e) => handleQuantity(e.target.value)}
        type="text"
        className="border py-2 outline-none w-[50px] text-black text-center"
        value={quantity}
      />
      <FaPlus onClick={() => handleQuantityButton("plus")} className="cursor-pointer" />
    </div>
  );
};

export default memo(SelectQuantity);
