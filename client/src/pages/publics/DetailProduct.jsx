import React from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const { pid, title } = useParams();
  console.log({ pid, title });
  return (
    <main className="w-full">
      <section className="flex justify-center h-[81px] bg-[#F7F7F7]">
        <div className="w-main ">
          <h4>{title}</h4>
        </div>
      </section>
    </main>
  );
};

export default DetailProduct;
