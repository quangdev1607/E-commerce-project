import { memo } from "react";
const SelectOption = ({ icon }) => {
  return (
    <div
      className=" border w-10 h-10 shadow-md bg-white cursor-pointer flex rounded-full items-center justify-center
         hover:bg-gray-800 hover:text-white hover:border-gray-800"
    >
      {icon}
    </div>
  );
};

export default memo(SelectOption);
