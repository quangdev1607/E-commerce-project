import React from "react";
import { Outlet } from "react-router";
import { Header, Navigation, TopHeader, Footer } from "../../components";
const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-main mt-5">
        <Outlet />
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default Public;
