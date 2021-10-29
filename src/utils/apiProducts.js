import axios from "axios";

const port = 4304;

export const getToken = () => {
  return  `Bearer ${localStorage.getItem("token")}`;
};

export const retrieveAllProducts = async (successCallback, errorCallBack) => {
  const options = {
    method: "GET",
    url: `http://localhost:${port}/api/v1/products`,
    headers: {
      Authorization: getToken(),
    },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const createProduct = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: `http://localhost:${port}/api/v1/products/create-product`,
    headers: { "Content-Type": "application/json",
    Authorization: getToken(), },
    data,
  };

  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editProduct = async (
  idProduct,
  data,
  successCallback,
  errorCallback
) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:${port}/api/v1/products/update-product/${idProduct}`,
    headers: { "Content-Type": "application/json",
    Authorization: getToken(), },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const deleteProduct = async (id, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:${port}/api/v1/products/delete/${id}`,
    headers: { "Content-Type": "application/json",
    Authorization: getToken(), },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
