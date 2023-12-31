import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import { apiDeleteProduct, apiGetProducts } from "../../../api";
import { InputForm, Pagination, Variants } from "../../../components";
import useDebounce from "../../../hooks/useDebounce";
import icons from "../../../utils/icons";
import { UpdateProduct } from "../../admin";

const ManageProducts = () => {
  const { MdEdit, IoTrashBin, IoAdd } = icons;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const fetchProducts = async (params) => {
    const response = await apiGetProducts(params);
    if (response.success) setProducts(response);
  };

  const [products, setProducts] = useState([]);
  const [params] = useSearchParams();
  const queriesDebounce = useDebounce(watch("q"), 1000);
  const [update, setUpdate] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [variants, setVariants] = useState(null);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "Delete this product?",
      text: "This product will be permanently deleted, are you sure to continue?",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) {
          Swal.fire("Done", response.msg, "success");
          render();
        }
      }
    });
  };

  useEffect(() => {
    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queriesDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queriesDebounce]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);

    fetchProducts(queries);
  }, [params, update]);
  return (
    <div className="relative">
      {editedProduct && (
        <div className="absolute inset-0 bg-gray-100  min-h-screen z-50">
          <UpdateProduct
            setEditedProduct={setEditedProduct}
            editedProduct={editedProduct}
            render={render}
          />
        </div>
      )}
      {variants && (
        <div className="absolute inset-0 bg-gray-100  min-h-screen z-50">
          <Variants
            setVariants={setVariants}
            variants={variants}
            render={render}
          />
        </div>
      )}

      <header>
        <h1 className="flex items-center justify-between h-[75px] text-3xl font-semibold px-4 border-b border-gray-600">
          <span>Manage products</span>
        </h1>
      </header>
      <div className="w-full py-4 ">
        <div className="flex w-full justify-end items-center px-4">
          <form className="w-[45%]">
            <InputForm
              id={"q"}
              register={register}
              fullWidth={true}
              placeholder={"Search products by title..."}
              errors={errors}
            />
          </form>
        </div>

        <table className="w-full table-auto mb-6 text-left border-collapse border border-slate-500 ">
          <thead className="font-semibold bg-gray-300 text-sm  text-center">
            <tr>
              <th className="px-4 py-2 border border-slate-600">#</th>
              <th className="px-4 py-2 border border-slate-600">Thumbnail</th>
              <th className="px-4 py-2 border border-slate-600">Title</th>
              <th className="px-4 py-2 border border-slate-600">Brand</th>
              <th className="px-4 py-2 border border-slate-600">Category</th>
              <th className="px-4 py-2 border border-slate-600">Price</th>
              <th className="px-4 py-2 border border-slate-600">Quantity</th>
              <th className="px-4 py-2 border border-slate-600">Sold</th>
              <th className="px-4 py-2 border border-slate-600">Color</th>
              <th className="px-4 py-2 border border-slate-600">Ratings</th>
              <th className="px-4 py-2 border border-slate-600">Variants</th>
              <th className="px-4 py-2 border border-slate-600">Updated at</th>
              <th className="px-4 py-2 border border-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.map((product, idx) => (
              <tr className="border-b-2 border-slate-500" key={product._id}>
                <td className="border text-center border-slate-700 p-2">
                  {idx +
                    ((+params.get("page") > 1 ? params.get("page") - 1 : 0) *
                      +import.meta.env.VITE_LIMIT +
                      1)}
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <img
                    src={product?.thumbnail}
                    alt="thumbnail"
                    className="w-12 h-12 object-contain"
                  />
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.title}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.brand}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.category}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.price}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.quantity}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.sold}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.color}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.totalRatings}</span>
                </td>
                <td className=" border-r border-slate-500 p-2">
                  <span>{product?.variants.length}</span>
                </td>

                <td className="p-2 border-r border-slate-500">
                  {moment(product.updatedAt).format("DD/MM/YYYY")}
                </td>
                <td className="p-2  ">
                  <span
                    onClick={() => setEditedProduct(product)}
                    className="text-center inline-block px-1 hover:text-green-500 cursor-pointer"
                  >
                    <MdEdit size={20} />
                  </span>

                  <span
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-center inline-block px-1  hover:text-red-500 cursor-pointer"
                  >
                    <IoTrashBin size={20} />
                  </span>
                  <span
                    onClick={() => setVariants(product)}
                    className="text-center inline-block px-1  hover:text-orange-500 cursor-pointer"
                  >
                    <IoAdd size={20} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full text-right mx-2">
          <Pagination totalCount={products?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
