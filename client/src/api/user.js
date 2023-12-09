import axios from "../axiosCofig";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });

export const apiVerifyAccount = (token) =>
  axios({
    url: "/user/register-verification/" + token,
    method: "put",
  });

export const apiGetCurrentUser = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

export const apiLogout = () =>
  axios({
    url: "/user/logout",
    method: "get",
  });

export const apiGetAllUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdateUser = (data, userId) =>
  axios({
    url: "/user/" + userId,
    method: "put",
    data,
  });

export const apiDeleteUser = (userId) =>
  axios({
    url: "/user/" + userId,
    method: "delete",
  });
