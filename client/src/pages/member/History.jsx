import moment from "moment";
import React, { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { apiGetOrders } from "../../api";
import { CustomSelect, Pagination } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import { statusOrder } from "../../utils/constants";

const History = ({ navigate, location }) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();

  const fetchOrders = async (params) => {
    const response = await apiGetOrders(params);
    if (response.success) {
      setOrders(response.data);
      setCounts(response.counts);
    }
  };
  const handleSearchStatus = ({ value }) => {
    if (value) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ status: value }).toString(),
      });
    } else navigate(location.pathname);
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);
  return (
    <div className="w-full relative ">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-500">
        <h1>History</h1>
      </header>
      <div className="w-full py-4">
        <div className="flex justify-end items-center px-4">
          <form className="w-[45%] py-2 gap-4">
            <CustomSelect options={statusOrder} onChange={(val) => handleSearchStatus(val)} wrapClassName={"w-full"} />
          </form>
        </div>
        <table className="w-full table-auto mb-6 text-left border-collapse border border-slate-500 ">
          <thead className="font-semibold bg-gray-300 text-sm  text-center">
            <tr>
              <th className="px-4 py-2 border border-slate-600">#</th>
              <th className="px-4 py-2 border border-slate-600">Order(s)</th>
              <th className="px-4 py-2 border border-slate-600">Total</th>
              <th className="px-4 py-2 border border-slate-600">Status</th>
              <th className="px-4 py-2 border border-slate-600">Created at</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, idx) => (
              <tr className="border-b-2 border-slate-500" key={order._id}>
                <td className="border text-center border-slate-700 p-2">
                  {idx + ((+params.get("page") > 1 ? params.get("page") - 1 : 0) * +import.meta.env.VITE_LIMIT + 1)}
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <ul className="flex flex-col">
                    {order?.products.map((el) => (
                      <li key={el._id}>{`${el?.title}-${el?.color}`}</li>
                    ))}
                  </ul>
                </td>
                <td className="text-center border-r border-slate-500 p-2">
                  <span>{`$${order?.total}`}</span>
                </td>
                <td className="text-center border-r border-slate-500 p-2">
                  <span>{order?.status}</span>
                </td>
                <td className="text-center border-r border-slate-500 p-2">
                  <span>{moment(order?.createdAt).format("DD/MM/YYYY")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full   px-4">
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(History);
