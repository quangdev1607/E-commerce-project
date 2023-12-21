import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Cart, Modal } from "./components";
import { AdminLayout, CreateProducts, DashBoard, ManageOrders, ManageProducts, ManageUsers } from "./pages/admin";
import { Checkout, History, MemberLayout, MyCart, Personal, WishList } from "./pages/member";
import {
  Blogs,
  Contact,
  DetailCart,
  DetailProduct,
  FAQ,
  Home,
  Login,
  Products,
  Public,
  RegisterVerification,
  ResetPassword,
  Services,
} from "./pages/publics";
import { showCartModal } from "./store/app/appSlice";
import { getCategories } from "./store/app/asyncActions";
import path from "./utils/path";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCartModal } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className=" h-full font-main relative ">
      {isShowCartModal && (
        <div
          onClick={() => dispatch(showCartModal())}
          className="absolute inset-0  flex backdrop-brightness-50 z-50 justify-end"
        >
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECKOUT} element={<Checkout />}></Route>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />}></Route>
          <Route path={path.DETAIL_CART} element={<DetailCart />}></Route>
          <Route path={path.ALL} element={<Home />}></Route>
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
        <Route path={path.REGISTER_VERIFICATION} element={<RegisterVerification />}></Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />}></Route>
          <Route path={path.MANAGE_USER} element={<ManageUsers />}></Route>
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />}></Route>
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />}></Route>
          <Route path={path.MANAGE_ORDER} element={<ManageOrders />}></Route>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />}></Route>
          <Route path={path.WISHLIST} element={<WishList />}></Route>
          <Route path={path.HISTORY} element={<History />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
