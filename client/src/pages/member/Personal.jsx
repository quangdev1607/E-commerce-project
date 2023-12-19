import moment from "moment";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiUpdateMember } from "../../api";
import avatar from "../../assets/avatar-default.jpg";
import { Button, InputForm } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import { getCurrent } from "../../store/user/asyncActions";
const Personal = ({ navigate }) => {
  const { current } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      mobile: current?.mobile,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const handleUpdateUser = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateMember(formData);
    console.log(response);
    if (response.success) {
      dispatch(getCurrent());
      Swal.fire("Done!", response.msg, "success");
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else {
      Swal.fire("Oops", response.msg, "error");
    }
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-500">
        <h1>Personal</h1>
        <span className="text-lg">{`Created time: ${moment(current?.createdAt).fromNow()}`}</span>
      </header>

      <form onSubmit={handleSubmit(handleUpdateUser)} className=" flex flex-col gap-6 w-3/5 mx-auto py-8">
        <InputForm
          label="First name:"
          register={register}
          errors={errors}
          id="firstname"
          validate={{ required: "This field is required" }}
          fullWidth
          placeholder={"Type your first name..."}
        />
        <InputForm
          label="Last name:"
          register={register}
          errors={errors}
          validate={{ required: "This field is required" }}
          id="lastname"
          fullWidth
          placeholder={"Type your last name..."}
        />
        <InputForm
          label="Email:"
          register={register}
          errors={errors}
          validate={{
            required: "This field is required",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
              message: "Invalid Email",
            },
          }}
          id="email"
          fullWidth
          placeholder={"Type your email..."}
        />
        <InputForm
          label="Mobile:"
          register={register}
          validate={{
            required: "This field is required",
            pattern: {
              value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
              message: "Phone invalid",
            },
          }}
          errors={errors}
          id="mobile"
          fullWidth
          placeholder={"Type your mobile..."}
        />

        <InputForm
          label="Address:"
          register={register}
          errors={errors}
          validate={{ required: "This field is required" }}
          id="address"
          fullWidth
          placeholder={"Type your address..."}
        />
        <div className="flex flex-col gap-2">
          <span>Profile Image:</span>
          <label className="w-[80px]" htmlFor="avatar">
            <img
              className="w-20 h-20 object-cover rounded-full cursor-pointer"
              src={current?.avatar || avatar}
              alt="avatar"
            />
          </label>
          <input type="file" id="avatar" {...register("avatar")} hidden errors={errors} />
        </div>
        <div className="w-full flex justify-end">
          <Button
            disabled={!isDirty}
            style={!isDirty && "cursor-default px-4 py-2 rounded-md text-white  bg-gray-500 text-semibold "}
            type="submit"
            name={"Update user"}
          />
        </div>
      </form>
    </div>
  );
};

export default withBaseComponent(memo(Personal));
