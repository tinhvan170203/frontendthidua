import axios from 'axios'
import  {API_SERVER}  from './constantApi.js';
const axiosCommon = axios.create({
    // baseURL: 'https://quanlydoanvien.vercel.app/',
   baseURL: API_SERVER,
    // baseURL: 'http://10.19.3.10:5555/',

    headers: {
    // 'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // Để request gửi kèm cookie
});

//Interceptors : nơi làm gì đấy cho tất cả các request hoặc respone thì gắn interceptors
// Add a request interceptor
axiosCommon.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config.headers.token = "Bearer hello"
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosCommon.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error


    return Promise.reject(error);
  });



export default axiosCommon;