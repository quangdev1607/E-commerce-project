import { memo } from "react";
import { useSelector } from "react-redux";
import { createSearchParams } from "react-router-dom";
import withBaseComponent from "../../hocs/withBaseComponent";

const HotCollections = ({ navigate }) => {
  const { categories } = useSelector((state) => state.app);
  return (
    <>
      <section className="w-full py-[15px] pr-[15px] mt-3 border-b-2  border-main">
        <span className=" uppercase font-semibold text-[20px] ">Hot Collections</span>
      </section>
      <section className="grid grid-cols-3 gap-4 mt-3">
        {categories
          ?.filter((cate) => cate.brand.length > 0)
          .map((cate) => (
            <div key={cate._id} className="flex items-center justify-center gap-8 p-4 border">
              <img width={144} height={129} src={cate.image} alt="brandimgage" />
              <div className="flex flex-col">
                <h1 className=" font-semibold uppercase text-sm ">{cate.category}</h1>
                {cate.brand.map((item, idx) => (
                  <span
                    onClick={() => {
                      navigate({
                        pathname: `/${cate.category.toLowerCase()}`,
                        search: createSearchParams({
                          brand: item.toUpperCase(),
                        }).toString(),
                      });
                    }}
                    className="font-light text-[#808080] text-sm  pt-2 hover:text-main cursor-pointer"
                    key={idx}
                  >{`>${item}`}</span>
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default withBaseComponent(memo(HotCollections));
