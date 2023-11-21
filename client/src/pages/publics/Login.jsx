import { useState, useCallback } from "react";
import { InputFields, Button } from "../../components";
import { Link } from "react-router-dom";

const Login = () => {
	const [payLoad, setPayLoad] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = useCallback(() => {
		console.log(payLoad);
	}, [payLoad]);

	return (
		<main className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600">
			<div className="flex flex-col w-[500px] bg-white rounded-lg gap-5">
				<form action="">
					<h1 className=" text-2xl text-center p-5  border-b-2  border-gray font-bold">LOGIN</h1>
					<div className="p-5 flex flex-col items-start gap-5 ">
						<InputFields type={"text"} nameKey="email" setValue={setPayLoad} value={payLoad.email} />
						<InputFields
							type={"password"}
							nameKey="password"
							setValue={setPayLoad}
							value={payLoad.password}
						/>
						<Link className="font-normal text-gray-500 mt-3 pb-2 hover:text-gray-700">
							Forget password?
						</Link>

						<Button
							name="Login"
							handleOnClick={handleSubmit}
							style={"p-4 bg-gray-300 w-full rounded-full hover:bg-blue-400 text-lg"}
						/>
					</div>

					<div className="w-full flex items-center justify-center pb-5">
						<span>
							Not a member? <Link className="text-blue-400">SignUp</Link>
						</span>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Login;
