import axios, { AxiosError, AxiosInstance } from 'axios';
// import {
//   clearLS,
//   getAccessTokenFromLS,
//   setAccessTokenToLS,
//   setProfileToLS,
// } from "./auth";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8010/api',
      // baseURL: "https://isports.okchoi.com/api",
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
// let accessToken = getAccessTokenFromLS() || "";
const http = new Http().instance;

// http.interceptors.request.use(
// 	(config) => {
// 		if (config.headers && accessToken) {
// 			config.headers.authorization = `Bearer ${accessToken}`;
// 			return config;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// // Add a response interceptor
// http.interceptors.response.use(
//   (response) => {
//     const { url } = response.config;
//     const data = response.data;
//     if (url === "/users/signup" || url === "/users/login") {
//       accessToken = data.result.accessToken;
//       setAccessTokenToLS(accessToken);
//       setProfileToLS(data.result.returnUser);
//     } else if (url === "/auth/logout") {
//       clearLS();
//     }
//     return response;
//   },
//   function (error: AxiosError) {
//     // @ts-ignore
//     toast.error(error.response?.data?.message || "Something went wrong");
//     return Promise.reject(error);
//   }
// );

export default http;
