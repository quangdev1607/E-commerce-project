import React, { memo, useEffect, useState } from "react";
import { createSearchParams, redirect, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PriceFilter } from "..";
import { apiGetProducts } from "../../api";
import { colors } from "../../utils/constants";
import icons from "../../utils/icons";

const SearchItem = ({ name, activeFilter, changeActiveFilter, type = "checkbox" }) => {
  const { FaAngleDown } = icons;
  const [selected, setSelected] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [priceValues, setPriceValues] = useState([lowestPrice, highestPrice]);
  const [isSubmitPriceFilter, setIsSubmitPriceFilter] = useState(false);

  const handleSubmitPriceFilter = () => {
    setIsSubmitPriceFilter(!isSubmitPriceFilter);
  };

  const handleSelect = (e) => {
    const alreadySelected = selected.some((el) => el === e.target.value);
    if (alreadySelected) setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };
  const { category } = useParams();
  const navigate = useNavigate();

  const [params] = useSearchParams();
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (selected.length > 0) {
      queries.color = selected.map((item) => item.toUpperCase()).join(",");
      queries.page = 1;
    } else delete queries.color;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  useEffect(() => {
    if (priceValues.some((el) => el !== 0)) {
      const queries = Object.fromEntries([...params]);
      queries.page = 1;
      queries.from = priceValues[0];
      queries.to = priceValues[1];
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [isSubmitPriceFilter]);

  const fetchProductPrice = async () => {
    const res = await Promise.all([
      apiGetProducts({ sort: "price", limit: 1 }),
      apiGetProducts({ sort: "-price", limit: 1 }),
    ]);
    if (res[0].success) setLowestPrice(res[0].data[0].price);
    if (res[1].success) setHighestPrice(res[1].data[0].price);
  };

  useEffect(() => {
    fetchProductPrice();
    setPriceValues([lowestPrice, highestPrice]);
  }, []);

  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className=" cursor-pointer p-4 text-sm relative border border-gray-800 flex justify-between items-center gap-6"
    >
      <span>{name}</span>
      <FaAngleDown />
      {activeFilter === name && (
        <div
          id="1"
          onClick={(e) => e.stopPropagation()}
          className=" cursor-default z-10 absolute top-[calc(100%+3px)] left-[-1px] w-fit p-4 bg-white border border-black min-w-[150px]"
        >
          {type === "checkbox" && (
            <div>
              <div className="p-4 flex gap-8 items-center justify-between  border-b">
                <span className=" min-w-[80px] whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div onClick={(e) => e.stopPropagation()} className="cursor-default mt-2 flex flex-col">
                {colors.map((el, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      id={el}
                      type="checkbox"
                      key={idx}
                      name={el}
                      value={el}
                      onChange={handleSelect}
                      checked={selected.some((selectedItem) => selectedItem === el)}
                    />
                    <label className=" capitalize text-gray-700 font-medium" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "input" && (
            <PriceFilter
              id={"2"}
              minPrice={priceValues[0]}
              maxPrice={priceValues[1]}
              minStart={lowestPrice}
              maxStart={highestPrice}
              changePriceValue={setPriceValues}
              priceValues={priceValues}
              handleSubmitPriceFilter={handleSubmitPriceFilter}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
