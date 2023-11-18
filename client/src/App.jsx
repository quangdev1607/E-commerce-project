import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Public } from "./pages/publics";
import path from "./utils/path";
import { getCategories } from "./store/asyncActions";
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
					<Route path={path.LOGIN} element={<Login />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
