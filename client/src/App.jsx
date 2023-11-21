import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Public, Products, Blogs, Services, FAQ, Contact, DetailProduct } from "./pages/publics";
import path from "./utils/path";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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
					<Route path={path.PRODUCTS} element={<Products />}></Route>
					<Route path={path.BLOGS} element={<Blogs />}></Route>
					<Route path={path.FAQs} element={<FAQ />}></Route>
					<Route path={path.SERVICES} element={<Services />}></Route>
					<Route path={path.CONTACT} element={<Contact />}></Route>
					<Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />}></Route>
				</Route>
				<Route path={path.LOGIN} element={<Login />}></Route>
			</Routes>
		</div>
	);
}

export default App;
