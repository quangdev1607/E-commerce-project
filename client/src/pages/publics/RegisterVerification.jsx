import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../utils/path";
import Swal from "sweetalert2";

const RegisterVerification = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "fail")
      Swal.fire("Oops!", "Account verification failed", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire("Congratulation!", "Account registered successfully", "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
  }, []);
  return <div className=" min-h-screen bg-gradient-to-r from-purple-600 to-blue-600"></div>;
};

export default RegisterVerification;
