import axios from "../axiosCofig";

export const apiGetProducts = (params) =>
  axios({
    url: "/product",
    method: "get",
    params,
  });

export const apiGetSingleProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "get",
  });

export const apiRatingProduct = (data) =>
  axios({
    url: "/product/ratings",
    method: "put",
    data,
  });

export const apiCreateProduct = (data) =>
  axios({
    url: "/product",
    method: "post",
    data,
  });
export const apiUpdateProduct = (data, pid) =>
  axios({
    url: "/product/" + pid,
    method: "put",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "delete",
  });

export const apiAddVariant = (data, pid) =>
  axios({
    url: "/product/variants/" + pid,
    method: "put",
    data,
  });
