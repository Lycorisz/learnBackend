import axios,{AxiosResponse,AxiosRequestConfig} from 'axios';
import qs from 'qs';
import {Message} from 'element-ui';
import router from '@/router'
// 创建axios 实例
axios.defaults.withCredentials = true;
const service = axios.create({
  // baseURL: baseURL,
  timeout: 10000
  // headers: headers,
});
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
// 请求拦截
service.interceptors.request.use((config:AxiosRequestConfig)=>{
  if(localStorage.tsToken){
    config.headers.Authorization = localStorage.tsToken;
  }
  return config;
},(err:any)=>{
  Promise.reject(err);
})
  
// 响应拦截

service.interceptors.response.use((res:AxiosResponse)=>{
  return res;
},(err:any)=>{
  let errMsg = "";
  if(err && err.response.status){
    switch(err.response.status){
     case 401:
          errMsg = '登录状态失效，请重新登录';
          localStorage.removeItem('tsToken');
          router.push('/login');
          break;
        case 403:
          errMsg = '拒绝访问';
          break;

        case 408:
          errMsg = '请求超时';
          break;

        case 500:
          errMsg = '服务器内部错误';
          break;

        case 501:
          errMsg = '服务未实现';
          break;

        case 502:
          errMsg = '网关错误';
          break;

        case 503:
          errMsg = '服务不可用';
          break;

        case 504:
          errMsg = '网关超时';
          break;

        case 505:
          errMsg = 'HTTP版本不受支持';
          break;

        default:
          errMsg = err.response.data.msg;
          break;
    }
  }else{
    errMsg=err;
  }
  Message.error(errMsg);
  return Promise.reject(errMsg);
})

export default service;