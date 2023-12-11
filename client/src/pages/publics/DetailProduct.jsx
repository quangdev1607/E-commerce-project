import DOMPurify from "dompurify";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { apiGetProducts, apiGetSingleProduct } from "../../api";
import { BreadCrumb, Button, ProductDisplay, ProductInfo, SelectQuantity } from "../../components";
import { formatCash, renderStars, roundCash } from "../../utils/helpers";

import icons from "../../utils/icons";
const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const DetailProduct = () => {
  const { FaShieldAlt, FaPhoneAlt, FaShippingFast, FaGift, GiReturnArrow } = icons;
  const [product, setProduct] = useState(null);
  const { pid, title, category } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [update, setUpdate] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState(null);

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

  const fetchSuggestedProduct = async () => {
    const response = await apiGetProducts({ category: product?.category });

    if (response.success) setSuggestedProducts(response.data);
  };

  const fetchProductData = async () => {
    const response = await apiGetSingleProduct(pid);
    if (response.success) setProduct(response.productData);
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      window.scrollTo(0, 0);
    }
  }, [pid]);

  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);

  const renderUpdate = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    fetchSuggestedProduct();
  }, [product]);
  return (
    <main className="w-full ">
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
            <Slider className="image-slider" {...settings}>
              {product?.images.map((el, idx) => (
                <img src={el} key={idx} className="w-[143px] h-[143px] object-cover border" alt={`image ${idx}`} />
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{`${formatCash(roundCash(product?.price))} VND`}</h2>
          <span className="flex h-4">
            {renderStars(product?.totalRatings)} <small className="ml-3">{`${product?.rating.length} review`}</small>
          </span>
          <ul>
            {product?.description.spec.length > 1 &&
              product?.description?.spec.map((item, idx) => (
                <li className="list-item list-square ml-[17px] leading-6" key={idx}>
                  {item}
                </li>
              ))}
            {product?.description.spec.length === 1 && (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description.spec) }}
              ></div>
            )}
          </ul>
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleQuantityButton={handleQuantityButton}
          />

          <Button name={"Add to cart"} />

          <span className="text-sm italic font-light">{`(Sold: ${product?.sold})`}</span>
        </div>
        <div className="w-1/5 flex flex-col gap-3">
          <div className="flex gap-3 border p-1 items-center ">
            <FaShieldAlt className="w-[30px] h-[30px]" />
            <div className="flex flex-col justify-start">
              <h4 className="text-[14px] font-medium">Guarantee</h4>
              <span className="text-xs font-light">Quality Check</span>
            </div>
          </div>
          <div className="flex gap-3 border p-1 items-center ">
            <FaShippingFast className="w-[30px] h-[30px]" />
            <div className="flex flex-col">
              <h4 className="text-[14px] font-medium">Free Shipping</h4>
              <span className="text-xs font-light">Free On All Products</span>
            </div>
          </div>
          <div className="flex gap-3 border p-1 items-center ">
            <FaGift className="w-[30px] h-[30px]" />
            <div className="flex flex-col">
              <h4 className="text-[14px] font-medium">Special Gift Cards</h4>
              <span className="text-xs font-light">Special Gift Cards</span>
            </div>
          </div>
          <div className="flex gap-3 border p-1 items-center ">
            <GiReturnArrow className="w-[30px] h-[30px]" />
            <div className="flex flex-col">
              <h4 className="text-[14px] font-medium">Free Return</h4>
              <span className="text-xs font-light">Within 7 Days</span>
            </div>
          </div>
          <div className="flex gap-3 border p-1 items-center ">
            <FaPhoneAlt className="w-[30px] h-[30px]" />
            <div>
              <h4 className="text-[14px] font-medium">Consultancy</h4>
              <span className="text-xs font-light">Lifetime 24/7/356</span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-main m-auto  mt-[48px]">
        <ProductInfo
          productName={product?.title}
          totalReviews={product?.rating}
          totalRatings={product?.totalRatings}
          pid={pid}
          handleRerender={renderUpdate}
        />
      </section>
      <div className="w-main m-auto mt-4">
        <h1 className="uppercase font-semibold text-lg border-b-4 border-red-500 ">Other customer also buy:</h1>
        <div className="mt-4">
          <Slider className="custom-slider" {...settings}>
            {suggestedProducts?.map((item) => (
              <ProductDisplay noLabel={true} key={item._id} productData={item} />
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default DetailProduct;
