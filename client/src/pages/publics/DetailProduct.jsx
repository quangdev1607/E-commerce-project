import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { apiGetSingleProduct } from "../../api";
import { BreadCrumb } from "../../components";
import { renderStars } from "../../utils/helpers";
const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 3,
};

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
      <section className="w-main flex m-auto mt-4">
        <div className="w-2/5 flex flex-col gap-4">
          <img src={product?.thumbnail} alt="thumb" className="border h-[458px] w-[458px] object-cover" />
          <div className="w-[458px]">
            <Slider className="image-slider " {...settings}>
              {product?.images.map((el, idx) => (
                <img src={el} key={idx} className="border" alt={`image ${idx}`} />
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5">detail</div>
        <div className="w-1/5">info</div>
      </section>
      <div className="h-[500px]"></div>
    </main>
  );
};

export default DetailProduct;
