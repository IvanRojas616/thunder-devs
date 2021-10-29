import axios from "axios";
import { getToken } from "utils/apiProducts";

const port = 4304;

export const retrieveAllUsers = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: `${APIdomain}/api/v1/users/`,
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//here we send the token to back, so we can know the data user especially their roles (note: in this app, we don't delegate the roles to auth0)
export const retrieveDataUser = async (successCallback, errorCallBack) => {
  const options = {
    method: "GET",
    //here is a dummy or self url
    url: `${APIdomain}/api/v1/users/self`,
    headers: {
      Authorization: getToken(),
    },
  };

  await axios.request(options).then(successCallback).catch(errorCallBack);
};

export const editUser = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: "PATCH",
    url: `${APIdomain}/api/v1/users/edit/${id}`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
