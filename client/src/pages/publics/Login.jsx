import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiForgotPassword, apiLogin, apiRegister, apiVerifyAccount } from "../../api/user";
import { Button, InputFields } from "../../components";
import { login } from "../../store/user/userSlice";
import { validate } from "../../utils/helpers";
import path from "../../utils/path";

const Login = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  };

  const [payLoad, setPayLoad] = useState(initialState);

  const [isLogin, setIsLogin] = useState(true);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [invalidFields, setInvalidFields] = useState([]);

  const [isVerifyEmail, setIsVerifyEmail] = useState(false);

  const [token, setToken] = useState("");

  // Clear input
  const resetPayload = () => {
    setPayLoad(initialState);
  };

  useEffect(() => {
    setPayLoad(initialState);
    setInvalidFields([]);
  }, [isLogin]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Handle Submit
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payLoad;
    const invalids = isLogin ? validate(data, setInvalidFields) : validate(payLoad, setInvalidFields);
    // Login
    if (invalids === 0) {
      if (isLogin) {
        const response = await apiLogin(data);
        if (response.success) {
          dispatch(login({ isLoggedIn: true, token: response.accessToken, current: response.userData }));
          navigate(`/${path.HOME}`);
        } else Swal.fire("Oops!", response.msg, "error");
      }

      //Register
      if (!isLogin) {
        const response = await apiRegister(payLoad);
        if (response.success)
          Swal.fire("Email sent!", response.msg, "info").then(() => {
            resetPayload();
            setIsLogin(true);
            setIsVerifyEmail(true);
          });
        else Swal.fire("Oops!", response.msg, "error");
      }
    }
  }, [payLoad]);

  // Reset password
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success)
      Swal.fire("Email sent", response.msg, "info").then(() => {
        setEmail("");
        setIsForgotPassword(false);
      });
    else Swal.fire("Oops", response.msg, "error");
  };

  // Verify account
  const verifyAccount = async () => {
    const response = await apiVerifyAccount(token);
    if (response.success)
      Swal.fire("Congratulation", response.msg, "success").then(() => {
        setIsVerifyEmail(false);
      });
    else Swal.fire("Oops!", "Verified token is not valid", "error");
    setToken("");
  };
  //-------------------------------------------------------------------------------------------------------------
  return (
    <main className="relative w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600">
      {isVerifyEmail && (
        <section className="absolute  top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center bg-black bg-opacity-90  z-50 ">
          <div className="bg-white w-[500px] p-8 rounded-md flex items-center justify-center flex-col gap-3">
            <label htmlFor="code">Enter the verification code from your email: </label>
            <input
              type="text"
              id="code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border outline-none w-full"
            />
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-md text-white bg-main text-semibold hover:opacity-70"
                onClick={() => setIsVerifyEmail(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md text-white bg-green-500 text-semibold hover:opacity-70"
                onClick={verifyAccount}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      )}
      {isForgotPassword && (
        <div className="absolute py-8 top-0 left-0 bottom-0 right-0 flex flex-col items-center bg-white animate-slide-bottom ">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email:</label>
            <input
              className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
              type="text"
              id="email"
              placeholder="Ex: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end ">
              <Button
                name="Back"
                handleOnClick={() => setIsForgotPassword(false)}
                style={"px-4 py-2 rounded-md text-white bg-gray-400 mr-3 hover:opacity-70 text-semibold"}
              />
              <Button name="Submit" handleOnClick={handleForgotPassword} />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col w-[500px] bg-white rounded-lg gap-5">
        <form action="">
          <h1 className=" text-2xl text-center p-5  border-b-2  border-gray font-bold">
            {isLogin ? "Login" : "Register"}
          </h1>
          <div className="p-5 flex flex-col items-start gap-5 ">
            {!isLogin && (
              <div className="flex gap-2">
                <InputFields
                  type={"text"}
                  nameKey="firstname"
                  setValue={setPayLoad}
                  value={payLoad.firstname}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
                <InputFields
                  type={"text"}
                  nameKey="lastname"
                  setValue={setPayLoad}
                  value={payLoad.lastname}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
            )}
            {!isLogin && (
              <InputFields
                type={"text"}
                nameKey="mobile"
                setValue={setPayLoad}
                value={payLoad.mobile}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            )}

            <InputFields
              type={"text"}
              nameKey="email"
              setValue={setPayLoad}
              value={payLoad.email}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputFields
              type={"password"}
              nameKey="password"
              setValue={setPayLoad}
              value={payLoad.password}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />

            {isLogin && (
              <span
                onClick={() => setIsForgotPassword(true)}
                className="font-normal text-gray-500 mt-3 pb-2 hover:text-gray-700 cursor-pointer"
              >
                Forgot password?
              </span>
            )}

            <Button
              name={isLogin ? "Login" : "Register"}
              handleOnClick={handleSubmit}
              style={"p-4 bg-gray-300 w-full rounded-full hover:bg-blue-400 text-lg"}
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center  pb-5">
            {isLogin && (
              <span>
                Not a member?{" "}
                <Link
                  onClick={() => {
                    setIsLogin(false);
                  }}
                  className="text-blue-400"
                >
                  SignUp
                </Link>
              </span>
            )}

            {!isLogin && (
              <span>
                Already have account?{" "}
                <Link
                  onClick={() => {
                    setIsLogin(true);
                  }}
                  className="text-blue-400"
                >
                  Login
                </Link>
              </span>
            )}
            <Link className=" cursor-pointer hover:opacity-70" to={`/${path.HOME}`}>
              Go home
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
