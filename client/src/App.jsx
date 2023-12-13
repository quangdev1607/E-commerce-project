import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Modal } from "./components";
import { AdminLayout, CreateProducts, DashBoard, ManageOrders, ManageProducts, ManageUsers } from "./pages/admin";
import { History, MemberLayout, MyCart, Personal, WishList } from "./pages/member";
import {
  Blogs,
  Contact,
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
import { getCategories } from "./store/app/asyncActions";
import path from "./utils/path";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="relative min-h-screen font-main ">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.FAQs} element={<FAQ />}></Route>
          <Route path={path.SERVICES} element={<Services />}></Route>
          <Route path={path.CONTACT} element={<Contact />}></Route>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
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
          <Route path={path.MYCART} element={<MyCart />}></Route>
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
