import axios from "axios";
import { API_HOST, NOMICS_BASE_URL } from "../constant";
/**Create a instance of axios with a custom config */
export const http = axios.create({
  baseURL: API_HOST,
  // headers: { "Content-Type": "application/json", Accept: "multipart/form-data" }
  headers: {
    "Content-Type": "application/json",
  },
});

/**Add a request interceptor */
http.interceptors.request.use(
  function (config) {
    // const token = session.getSessionToken();
    const token = "";
    if (token) config.headers.Authorization = `Bearer ` + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**Add a response interceptor */
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (401 === error.response.status) {
      } else {
        return Promise.reject(error);
      }
    }
  }
);




/**
 * Instance for nomics APIs
 */

export const getInstance = axios.create({
  baseURL: NOMICS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

/**Add a response interceptor */
getInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (401 === error.response.status) {
      } else {
        return Promise.reject(error);
      }
    }
  }
);