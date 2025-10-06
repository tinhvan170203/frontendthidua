import axios from 'axios'
import jwt_decode from "jwt-decode"
import Cookies from 'js-cookie';
import  {API_SERVER}  from './constantApi.js';


const refreshToken  = async () => {
  try {
    // let {data} = await axios.get('https://quanlydoanvien.vercel.app/auth/requestRefreshToken',
    // let {data} = await axios.get('http://10.19.3.10:5555/auth/requestRefreshToken',
   let {data} = await axios.get(`${API_SERVER}/auth/requestRefreshToken`,
    {
      withCredentials: true,
    });
    
    return data
  } catch (error) {
    console.log(error.message)
  }
}

const axiosConfig = axios.create({
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

let refreshTokenRequest = null;
axiosConfig.interceptors.request.use(async function (config) {
    // Do something before request is sent
    //TH login hoặc refreshToken thì k cần kiểm 
    if(config.url.indexOf('login') >= 0 || config.url.indexOf('refresh') >= 0 || config.url.indexOf('change-pass') >= 0){
      return config
    };

    let date = new Date();

    const accessToken = localStorage.getItem('accessToken_theodoithidua');
    
    if(accessToken){
      config.headers.token = `Bearer ${accessToken}`;
      const decodedToken = jwt_decode(accessToken);
      
      if(decodedToken.exp < date.getTime()/1000){ // accessToken hết hạn thì phải gửi request refresh token
     
        refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshToken();

      const data = await refreshTokenRequest;


         // reset token request for the next expiration
      refreshTokenRequest = null;

        if(data){
          localStorage.setItem('accessToken_theodoithidua', data.accessToken)
          config.headers.token = `Bearer ${data.accessToken}`;
          Cookies.remove("refreshToken_quanlydoanvien");
          Cookies.set("refreshToken_quanlydoanvien", data.refreshToken,{ expires: 30, secure: true, sameSite: "none"});
        }
      }
    };

    return config;
  }, function (error) {
    // console.log(error.message)
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosConfig.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // status = 401, 403, 500 thì hiện thông báo và return k làm gì tiếp theo
    // console.log('hihi',response)
    
    return response;
  }, function (error) {
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {config, data, status} = error.response;
    // console.log(error)
    // console.log(config, data, status)
    if(data.message === "Token is not valid" || 
    data.message === "You are not authenticated"  ||
    data.message === "Token đã hết hạn, vui lòng đăng nhập lại"  ||
    config.ulr === "auth//requestRefreshToken" &&  status === 403  ){
      throw new Error("Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại")
    } 

    return Promise.reject(error.response.data);
  });



export default axiosConfig;