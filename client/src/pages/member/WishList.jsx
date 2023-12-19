import React from "react";
import { useSelector } from "react-redux";
import { ProductDisplay } from "../../components";

const WishList = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-500">
        <h1>My Wishlist</h1>
      </header>
      <div className="p-4 w-full flex gap-4 flex-wrap items-center justify-center">
        {current.wishlist.map((el) => (
          <div className="w-[300px]" key={el._id}>
            <ProductDisplay noLabel productData={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
