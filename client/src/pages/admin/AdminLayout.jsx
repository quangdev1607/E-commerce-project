import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AdminSideBar } from "../../components";
import path from "../../utils/path";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || current.role !== "admin") return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full bg-gray-100 text-gray-900 min-h-screen relative gap-3">
      <div className="w-[327px] top-0 bottom-0 flex-none fixed">
        <AdminSideBar />
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
