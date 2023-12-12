import React, { memo } from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return <FadeLoader color="white" />;
};

export default memo(Loading);
