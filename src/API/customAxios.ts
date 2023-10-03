import axios from "axios";
import BASE_URL from "../utils/baseUrl";

//Axios 인스턴스 생성
export const customAxios = axios.create({
  baseURL: BASE_URL,
});

export const customAuthAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

customAuthAxios.interceptors.request.use(
  function (config) {
    const accessToken = JSON.parse(
      JSON.stringify(localStorage.getItem("access_token"))
    );

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

customAuthAxios.interceptors.response.use(
  function (response) {
    return response; // 성공했을 때 response
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = "/signin"; //실패했을 때 error response
    }
    return Promise.reject(error);
  }
);
