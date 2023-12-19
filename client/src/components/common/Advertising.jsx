import React, { memo } from "react";
import ad1 from "../../assets/pr-1.jpg";
import ad2 from "../../assets/pr-2-1.jpg";
import ad3 from "../../assets/pr-2-2.jpg";
import ad4 from "../../assets/pr-3.jpg";
const Advertising = () => {
  return (
    <section className="grid grid-cols-4  grid-rows-2 gap-4 mt-4">
      <img className="object-cover w-full h-full col-span-2 row-span-2" src={ad1} alt="ad1" />

      <img className="object-cover w-full h-full col-span-1 row-span-1" src={ad2} alt="ad2" />
      <img className="object-cover w-full h-full col-span-1 row-span-2" src={ad4} alt="ad4" />
      <img className="object-cover w-full h-full col-span-1 row-span-1" src={ad3} alt="ad3" />
    </section>
  );
};

export default memo(Advertising);
