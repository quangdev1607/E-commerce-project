import React from "react";
import { Outlet } from "react-router";
import { Footer, Header, Navigation, TopHeader } from "../../components";
const Public = () => {
  return (
    <div className="max-h-screen overflow-y-auto w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex items-center flex-col">
        <Outlet />
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default Public;
