import React, { memo, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { colors } from "../utils/constants";
import icons from "../utils/icons";

const SearchItem = ({ name, activeFilter, changeActiveFilter, type = "checkbox" }) => {
  const { FaAngleDown } = icons;
  const [selected, setSelected] = useState([]);

  const handleSelect = (e) => {
    const alreadySelected = selected.some((el) => el === e.target.value);
    if (alreadySelected) setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };
  const { category } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        color: selected.map((item) => item.toUpperCase()),
      }).toString(),
    });
  }, [selected]);

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
          className=" cursor-default z-10 absolute top-[calc(100%+3px)] left-[-1px] w-fit p-4 bg-white  border border-black min-w-[150px]"
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
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
