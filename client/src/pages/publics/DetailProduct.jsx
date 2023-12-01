import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGetSingleProduct } from "../../api";
import { BreadCrumb } from "../../components";

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const { pid, title, category } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await apiGetSingleProduct(pid);
      if (response.success) setProduct(response.productData);
    };
    if (pid) {
      fetchProductData();
    }
  }, [pid]);
  return (
    <main className="w-full">
      <section className="flex flex-col items-center h-[81px] bg-[#F7F7F7]">
        <div className="w-main ">
          <h4 className="font-bold text-[18px] ">{title}</h4>
          <BreadCrumb title={title} category={category} />
        </div>
      </section>
    </main>
  );
};

export default DetailProduct;
