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
