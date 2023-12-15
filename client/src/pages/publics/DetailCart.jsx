import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { BreadCrumb, Button, OrderItem, SelectQuantity } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import { formatCash, roundCash } from "../../utils/helpers";

const DetailCart = ({ navigate }) => {
  const { current } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) return;
      else setQuantity(number);
    },
    [quantity]
  );

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
    <div className="w-full max-h-screen">
      <section className="flex flex-col items-center h-[81px] bg-[#F7F7F7]">
        <div className="w-main ">
          <h4 className="uppercase font-bold text-[18px] ">My cart</h4>
          <BreadCrumb category={"My cart"} />
        </div>
      </section>
      {current.cart.length > 0 ? (
        <Fragment>
          <section className="w-main grid my-8  py-3 text-center mx-auto grid-cols-10">
            <span className=" col-span-6 w-full">Product</span>
            <span className=" col-span-1 w-full">Quantity</span>
            <span className=" col-span-3 w-full">Price</span>
          </section>
          {current?.cart.map((el) => (
            <OrderItem key={el._id} el={el} />
          ))}

          <section className="w-main mx-auto flex flex-col gap-4 justify-center items-end">
            <span className="flex gap-4 items-center justify-center">
              <span className="text-2xl font-medium">Subtotal:</span>
              <span className="text-2xl font-semibold text-main">
                {formatCash(roundCash(current?.cart?.reduce((accumulate, el) => accumulate + Number(el.price), 0)))} VND
              </span>
            </span>
            <span className="font-light italic">Shipping, taxes, and discounts calculated at checkout.</span>
            <div className="flex gap-4">
              <Button
                style={"px-4 py-2 rounded-md text-white  bg-gray-500 text-semibold hover:bg-green-700"}
                name={"Update"}
              />
              <Button name={"Checkout"} />
            </div>
          </section>
        </Fragment>
      ) : (
        <div className="w-main mx-auto flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold">Your cart is currently empty</h1>
          <span>Keep browsing...</span>
        </div>
      )}
    </div>
  );
};

export default withBaseComponent(DetailCart);
// `/${productData.category.toLowerCase()}/${productData._id}/${productData.title}`
