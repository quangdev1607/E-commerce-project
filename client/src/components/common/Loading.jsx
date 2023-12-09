import React, { memo } from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return <FadeLoader color="#ee3131" />;
};

export default memo(Loading);
