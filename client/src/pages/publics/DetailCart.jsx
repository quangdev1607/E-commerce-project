import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BreadCrumb, Button, OrderItem, SelectQuantity } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import { updateCart } from "../../store/user/userSlice";
import { formatCash, roundCash } from "../../utils/helpers";
import path from "../../utils/path";

const DetailCart = ({ navigate, location }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const handleCheckout = () => {
    if (!current?.address)
      return Swal.fire({
        title: "Oops",
        text: "Seem like you have not updated your address yet",
        confirmButtonText: "Go update address",
        showCancelButton: true,
        cancelButtonText: "Maybe later...",
        icon: "info",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({ redirect: location.pathname }).toString(),
          });
        }
      });
    else {
      navigate(`/${path.CHECKOUT}`);
    }
  };

  return (
    <div className="w-full max-h-screen">
      <section className="flex flex-col items-center h-[81px] ">
        <div className="w-main ">
          <h4 className="uppercase font-bold text-[18px] ">My cart</h4>
          <BreadCrumb category={"My cart"} />
        </div>
      </section>
      {currentCart.length > 0 ? (
        <Fragment>
          <section className="w-main grid my-8  py-3 text-center mx-auto grid-cols-10">
            <span className=" col-span-6 w-full">Product</span>
            <span className=" col-span-1 w-full">Quantity</span>
            <span className=" col-span-3 w-full">Price</span>
          </section>
          {currentCart?.map((el) => (
            <OrderItem key={el._id} productQuantity={el.quantity} el={el} />
          ))}

          <section className="w-main mx-auto flex flex-col gap-4 justify-center items-end">
            <span className="flex gap-4 items-center justify-center">
              <span className="text-2xl font-medium">Subtotal:</span>
              <span className="text-2xl font-semibold text-main">
                {formatCash(
                  roundCash(currentCart?.reduce((accumulate, el) => accumulate + Number(el.price) * el.quantity, 0))
                )}{" "}
                VND
              </span>
            </span>
            <span className="font-light italic">Shipping, taxes, and discounts calculated at checkout.</span>
            <div className="flex gap-4">
              <Button
                style={"px-4 py-2 rounded-md text-white  bg-gray-500 text-semibold hover:bg-green-700"}
                name={"Update"}
              />
              <Button name={"Checkout"} handleOnClick={handleCheckout} />
              {/* <Link
                target="_blank"
                to={`/${path.CHECKOUT}`}
                className="px-4 py-2 rounded-md text-white bg-main text-semibold hover:opacity-70"
              >
                Check out
              </Link> */}
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
