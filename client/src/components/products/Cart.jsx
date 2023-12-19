import { memo } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiRemoveCart } from "../../api";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showCartModal } from "../../store/app/appSlice";
import { getCurrent } from "../../store/user/asyncActions";
import { formatCash, roundCash } from "../../utils/helpers";
import icons from "../../utils/icons";
import path from "../../utils/path";
import { Button } from "./../../components";

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const { IoTrashBin } = icons;
  const handleRemoveCart = async (pid) => {
    const response = await apiRemoveCart(pid);
    if (response.success) {
      dispatch(getCurrent());
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="grid grid-rows-10 w-[500px] max-h-screen overflow-y-auto bg-black text-white p-6"
    >
      <header className="flex justify-between items-center border-b border-b-white px-2 row-span-1 h-full">
        <h1 className="font-semibold text-2xl uppercase">Your cart</h1>
        <span onClick={() => dispatch(showCartModal())} className="text-lg cursor-pointer hover:opacity-50  ">
          x
        </span>
      </header>
      <section className=" flex flex-col gap-6 row-span-7  max-h-full overflow-y-auto py-3">
        {currentCart.length === 0 && <span className="text-xs italic">Your cart is empty</span>}
        {currentCart &&
          currentCart.map((el) => (
            <div className="flex items-center justify-between " key={el._id}>
              <div className="flex gap-4">
                <div className="flex items-center justify-center">
                  <img className="w-[80px] h-[80px]" src={el?.thumbnail} alt="thumbnail" />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-amber-500">{el?.title}</span>
                  <span>{`Price: ${formatCash(roundCash(el?.price))} VND`}</span>
                  <span>{`Color: ${el?.color}`}</span>
                  <span>{`Quantity: ${el?.quantity}`}</span>
                </div>
              </div>

              <IoTrashBin
                onClick={() => handleRemoveCart(el?._id)}
                className=" hover:opacity-50 cursor-pointer"
                size={20}
              />
            </div>
          ))}
      </section>
      <section className="flex flex-col gap-4 row-span-2 h-full justify-center border-t border-t-white px-2  ">
        <div className="flex items-center mt-4 justify-between">
          <span className="uppercase ">Subtotal: </span>
          <span className="text-2xl font-semibold">
            {formatCash(
              roundCash(currentCart?.reduce((accumulate, el) => accumulate + Number(el?.price) * el.quantity, 0))
            )}{" "}
            VND
          </span>
        </div>
        <Button
          handleOnClick={() => {
            dispatch(showCartModal());
            navigate(`/${path.DETAIL_CART}`);
          }}
          fullWidth={true}
          name={"Go to cart"}
        />
      </section>
    </div>
  );
};

export default withBaseComponent(memo(Cart));
