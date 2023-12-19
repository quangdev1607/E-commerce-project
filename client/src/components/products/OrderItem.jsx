import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectQuantity } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import { updateCart } from "../../store/user/userSlice";
import { formatCash, roundCash } from "../../utils/helpers";

const OrderItem = ({ dispatch, el, navigate, productQuantity = 1 }) => {
  const { current } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(productQuantity);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return;
      else setQuantity(number);
    },
    [quantity]
  );

  useEffect(() => {
    dispatch(updateCart({ pid: el?.product._id, quantity, color: el?.color }));
  }, [quantity]);

  const handleQuantityButton = useCallback(
    (flag) => {
      if (flag === "minus") {
        if (quantity > 1) setQuantity((prev) => +prev - 1);
      }
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  return (
    <section key={el._id} className="w-main grid my-8 border py-3  mx-auto grid-cols-10">
      <div className="col-span-6 w-full flex gap-4">
        <div className="flex items-center justify-center">
          <img className="w-[80px] h-[80px]" src={el?.thumbnail} alt="thumbnail" />
        </div>

        <div className="flex flex-col gap-2">
          <span
            onClick={() => navigate(`/${el?.product?.category.toLowerCase()}/${el?.product._id}/${el?.product.title}`)}
            className="cursor-pointer hover:opacity-50 text-xl font-medium text-amber-500"
          >
            {el?.title}
          </span>
          <span>{el?.color}</span>
        </div>
      </div>
      <span className=" col-span-1 w-full text-center">
        <SelectQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          handleQuantityButton={handleQuantityButton}
        />
      </span>
      <span className=" col-span-3 w-full text-center text-xl font-bold">{`${formatCash(
        roundCash(el?.price * quantity)
      )} VND`}</span>
    </section>
  );
  {
  }
};

export default withBaseComponent(memo(OrderItem));
