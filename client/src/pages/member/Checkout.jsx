import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import payment from "../../assets/payment.svg";
import { InputForm, PayPal, Success } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import { getCurrent } from "../../store/user/asyncActions";
import { formatCash, roundCash } from "../../utils/helpers";

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);

  const [isSucceed, setIsSucceed] = useState(false);

  useEffect(() => {
    if (isSucceed) {
      dispatch(getCurrent());
    }
  }, [isSucceed]);
  return (
    <div className="w-full p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto  gap-6">
      {isSucceed && <Success />}
      <div className="w-full flex justify-centeric items-center col-span-4">
        <img src={payment} alt="payment" />
      </div>
      <div className="w-full flex flex-col items-center justify-center col-span-6 gap-6">
        <h1 className="text-3xl font-semibold">Check out your product</h1>
        <div className="w-full flex flex-col justify-start gap-4">
          <h1>
            <small className="text-sm font-bold  pr-2">Full name:</small>
            {`${current?.firstname} ${current?.lastname}`}
          </h1>
          <h1>
            <small className="text-sm font-bold  pr-2">Phone:</small>
            {`${current?.mobile}`}
          </h1>
          <h1>
            <small className="text-sm font-bold  pr-2">Email:</small>
            {`${current?.email}`}
          </h1>
          <h1>
            <small className="text-sm font-bold  pr-2">Address:</small>
            {`${current?.address}`}
          </h1>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="border bg-gray-100">
              <th className="text-center p-2">Product</th>
              <th className="text-center p-2">Quantity</th>
              <th className="text-center p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCart.map((el) => (
              <tr className="text-center border" key={el._id}>
                <td>{el.title}</td>
                <td>{el.quantity}</td>
                <td>{`${formatCash(roundCash(el.price))} VND`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="text-2xl font-semibold text-main">
          <small className="text-base text-black pr-2">Subtotal: </small>
          {`${formatCash(
            roundCash(currentCart?.reduce((accumulate, el) => accumulate + Number(el.price) * el.quantity, 0))
          )} VND`}
        </span>

        <div className="w-full">
          <PayPal
            setIsSucceed={setIsSucceed}
            payload={{
              products: currentCart,
              total: Math.round(
                Number(currentCart?.reduce((accumulate, el) => accumulate + Number(el.price) * el.quantity, 0) / 23500)
              ),
              address: current?.address,
            }}
            amount={Math.round(
              Number(currentCart?.reduce((accumulate, el) => accumulate + Number(el.price) * el.quantity, 0) / 23500)
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Checkout);
