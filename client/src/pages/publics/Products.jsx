import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { apiGetProducts } from "../../api";
import { BreadCrumb, ProductDisplay, SearchItem } from "../../components";

const Products = () => {
  const { category } = useParams();
  //   const formatedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const [params] = useSearchParams();

  const [products, setProducts] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const fetchProductData = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response.success) setProducts(response.data);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    console.log(param);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    fetchProductData(queries);
  }, [params]);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeFilter === name) setActiveFilter(null);
      else setActiveFilter(name);
    },
    [activeFilter]
  );
  return (
    <main className="w-full">
      <section className="flex flex-col items-center h-[81px] bg-[#F7F7F7]">
        <div className="w-main ">
          <h4 className="uppercase font-bold text-[18px] ">{category}</h4>
          <BreadCrumb category={category} />
        </div>
      </section>
      <section className="w-main m-auto mt-4 border flex items-center justify-between">
        <div className="w-4/5 flex-auto p-3">
          <h1 className="font-semibold text-lg">Filter by:</h1>
          <div className="flex  gap-4  mt-3 ">
            <SearchItem type="input" changeActiveFilter={changeActiveFilter} activeFilter={activeFilter} name="Price" />
            <SearchItem changeActiveFilter={changeActiveFilter} activeFilter={activeFilter} name="Color" />
          </div>
        </div>
        <div className="w-1/5">
          <h1>Sort By:</h1>
        </div>
      </section>
      <section className="w-main m-auto mt-4 grid grid-cols-4 gap-4">
        {products?.map((item) => (
          <ProductDisplay key={item._id} noLabel={true} productData={item} />
        ))}
      </section>
      <div className="w-full h-[500px]"></div>
    </main>
  );
};

export default Products;
