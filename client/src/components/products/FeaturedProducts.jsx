import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetProducts } from "../../api";
import withBaseComponent from "../../hocs/withBaseComponent";
import { formatCash, renderStars, roundCash } from "../../utils/helpers";
import path from "../../utils/path";

const FeaturedProducts = ({ navigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const fetchFeaturedProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
    if (response.success === true) setFeaturedProducts(response.data);
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <>
      <section className="w-full py-[15px] pr-[15px] mt-3 border-b-2  border-main">
        <span className=" uppercase font-semibold text-[20px] ">Featured Product</span>
      </section>
      <section className="grid grid-cols-3 gap-4 mt-3">
        {featuredProducts.map((item) => (
          <div key={item._id} className="flex items-center justify-start border p-4">
            <img className="pr-3" width={84} height={84} src={item.thumbnail} alt="featured" />
            <div className="flex flex-col  gap-y-2">
              <Link
                to={`/${item.category.toLowerCase()}/${item._id}/${item.title}`}
                className="line-clamp-1 text-[14px] font-medium hover:text-main"
              >
                {item.title}
              </Link>
              <span className="flex">{renderStars(item?.totalRatings)}</span>

              <span className="text-xs font-normal">{`${formatCash(roundCash(item?.price))} VND`}</span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default withBaseComponent(memo(FeaturedProducts));
