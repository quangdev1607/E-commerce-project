import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
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
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.FAQs} element={<FAQ />}></Route>
          <Route path={path.SERVICES} element={<Services />}></Route>
          <Route path={path.CONTACT} element={<Contact />}></Route>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
        <Route path={path.REGISTER_VERIFICATION} element={<RegisterVerification />}></Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
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
