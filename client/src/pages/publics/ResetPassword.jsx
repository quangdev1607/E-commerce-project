import { useState, useCallback } from "react";
import { Button } from "../../components";
import { useParams, useNavigate, Link } from "react-router-dom";
import path from "../../utils/path";
import { apiResetPassword } from "../../api/user";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success)
      Swal.fire("Congratulation", response.msg, "success").then(() => {
        setPassword("");
        navigate(`/${path.LOGIN}`);
      });
    else Swal.fire("Oops!", response.msg, "error");
  };
  //----------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="  py-8  flex flex-col items-center  ">
      <div className=" w-main h-[110px] pt-[20px] pb-[34px] flex justify-between ">
        <Link to={`/${path.HOME}`}>
          <img className="w-[234px] object-contain" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Enter your new password:</label>
        <input
          className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
          type="text"
          id="password"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end ">
          <Button name="Submit" handleOnClick={handleResetPassword} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
