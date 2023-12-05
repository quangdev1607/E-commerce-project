import React, { memo, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../api";
import { PriceFilter } from "../components";
import { colors } from "../utils/constants";
import icons from "../utils/icons";

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

  useEffect(() => {
    if (selected.length > 0)
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.map((item) => item.toUpperCase()).join(","),
        }).toString(),
      });
    else navigate(`/${category}`);
  }, [selected]);

  useEffect(() => {
    const data = {};
    if (priceValues.some((el) => el !== 0)) {
      data.from = priceValues[0];
      data.to = priceValues[1];
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(data).toString(),
      });
    }
  }, [isSubmitPriceFilter]);

  const fetchHighestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setHighestPrice(response.data[0].price);
  };

  const fetchLowestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "price", limit: 1 });
    if (response.success) setLowestPrice(response.data[0].price);
  };

  useEffect(() => {
    fetchLowestPriceProduct();
    fetchHighestPriceProduct();
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
