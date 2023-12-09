import React, { memo } from "react";
import PriceSlider from "react-slider";
import { Button } from "..";
import { formatCash, roundCash } from "../../utils/helpers";

const PriceFilter = ({
  minPrice,
  maxPrice,
  changePriceValue,
  minStart,
  maxStart,
  priceValues,
  handleSubmitPriceFilter,
}) => {
  return (
    <div className="flex flex-col gap-3 min-w-[300px]">
      <div className="flex items-center justify-around mt-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium min-w-[105px] whitespace-nowrap">{`${formatCash(
            roundCash(minPrice)
          )} VND`}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium min-w-[105px] whitespace-nowrap">{`${formatCash(
            roundCash(maxPrice)
          )} VND`}</span>
        </div>
      </div>
      <div className="pb-5 border-b-2 ">
        <PriceSlider
          className={"slider"}
          onChange={changePriceValue}
          value={priceValues}
          min={minStart}
          max={maxStart}
          step={1000000}
        />
      </div>
      <div className="flex ">
        <Button
          style={"px-4 py-2 rounded-md text-white w-full bg-green-500 text-semibold hover:opacity-70"}
          name="Submit"
          handleOnClick={handleSubmitPriceFilter}
        />
      </div>
    </div>
  );
};

export default memo(PriceFilter);
