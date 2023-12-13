import clsx from "clsx";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiDeleteUser, apiGetAllUsers, apiUpdateUser } from "../../../api/user";
import { Button, InputFields, InputForm, Pagination, Select } from "../../../components";
import useDebounce from "../../../hooks/useDebounce";

const roles = [
  {
    code: "admin",
    value: "admin",
  },
  {
    code: "user",
    value: "user",
  },
];

const blockedStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];

const ManageUsers = () => {
  const fetchUsers = async (params) => {
    const response = await apiGetAllUsers(params);
    if (response.success) setUsers(response);
  };

  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState({
    q: "",
  });

  const [params] = useSearchParams();

  const queiresDebounce = useDebounce(queries.q, 1000);

  // Edit user
  const [update, setUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });

  const [editedUser, setEditedUser] = useState(null);
  const handleEditedUser = async (data) => {
    console.log(data);
    const response = await apiUpdateUser(data, editedUser._id);
    if (response.success) {
      reset();
      render();
      setEditedUser(null);
      Swal.fire({
        title: "Done!",
        text: "Updated user successfully",
        icon: "success",
      });
    }
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  //----------------------------------------------------

  // Delete user:
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Delete this user?",
      text: "This user will be permanently deleted, are your sure to continue?",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
        }
      }
    });
  };
  //
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queiresDebounce) queries.q = queiresDebounce;
    fetchUsers({ ...queries, limit: import.meta.env.VITE_LIMIT });
  }, [queiresDebounce, params, update]);

  return (
    <div className={clsx("w-full", editedUser && "pl-12")}>
      <header>
        <h1 className="flex items-center justify-between h-[75px] text-3xl font-semibold px-4 border-b border-gray-600">
          <span>Manage all users</span>
        </h1>
      </header>
      <div className="w-full py-4 px-2">
        <div className="flex justify-end py-4">
          <InputFields
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style="w500"
            placeholder={"Search name or mail"}
          />
        </div>
        <form onSubmit={handleSubmit(handleEditedUser)}>
          {editedUser && <Button type="submit" name={"Update"} />}
          <table className="w-full table-auto mb-6 text-left border-collapse border border-slate-500">
            <thead className="font-semibold bg-gray-300 text-sm  text-center">
              <tr>
                <th className="px-4 py-2 border border-slate-600">#</th>
                <th className="px-4 py-2 border border-slate-600">Email</th>
                <th className="px-4 py-2 border border-slate-600">First name</th>
                <th className="px-4 py-2 border border-slate-600">Last name</th>
                <th className="px-4 py-2 border border-slate-600">Role</th>
                <th className="px-4 py-2 border border-slate-600">Mobile</th>
                <th className="px-4 py-2 border border-slate-600">Status</th>
                <th className="px-4 py-2 border border-slate-600">Created at</th>
                <th className="px-4 py-2 border border-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user, idx) => (
                <tr key={user._id}>
                  <td className="border border-slate-700 p-3">{idx + 1}</td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <InputForm
                        defaultValue={editedUser?.email}
                        fullWidth
                        type={"email"}
                        register={register}
                        id={"email"}
                        validate={{
                          required: "This field is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid Email Format",
                          },
                        }}
                        errors={errors}
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <InputForm
                        defaultValue={editedUser?.firstname}
                        fullWidth
                        id={"firstname"}
                        validate={{ required: "This field is required" }}
                        register={register}
                        errors={errors}
                      />
                    ) : (
                      <span>{user.firstname}</span>
                    )}
                  </td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <InputForm
                        defaultValue={editedUser?.lastname}
                        fullWidth
                        id={"lastname"}
                        validate={{ required: "This field is required" }}
                        register={register}
                        errors={errors}
                      />
                    ) : (
                      <span>{user.lastname}</span>
                    )}
                  </td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <Select
                        defaultValue={editedUser?.role}
                        fullWidth
                        id={"role"}
                        validate={{ required: "This field is required" }}
                        register={register}
                        errors={errors}
                        options={roles}
                      />
                    ) : (
                      <span>{user.role}</span>
                    )}
                  </td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <InputForm
                        defaultValue={editedUser?.mobile}
                        fullWidth
                        id={"mobile"}
                        validate={{
                          required: "This field is required",
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: "Invalid phone number",
                          },
                        }}
                        register={register}
                        errors={errors}
                      />
                    ) : (
                      <span>{user.mobile}</span>
                    )}
                  </td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <Select
                        defaultValue={editedUser?.isBlocked}
                        fullWidth
                        id={"isBlocked"}
                        validate={{ required: "This field is required" }}
                        register={register}
                        errors={errors}
                        options={blockedStatus}
                      />
                    ) : (
                      <span>{user.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="border border-slate-700 p-3">{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="border border-slate-700 p-3">
                    {editedUser?._id === user?._id ? (
                      <span
                        onClick={() => {
                          setEditedUser(null), reset();
                        }}
                        className="px-2 text-green-500 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          reset(), setEditedUser(user);
                        }}
                        className="px-2 text-green-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    <span
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-2 text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full text-right">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
