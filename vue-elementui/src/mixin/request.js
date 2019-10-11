// import  Vue from  'vue'
// import axios from 'axios'
//
// /**
//  * 配置路径默认地址url
//  * @type {AxiosInstance}
//  */
// const instance = axios.create({
//   baseURL: 'http://192.168.0.108:8762/user',
// });
// // 添加请求拦截器
// // instance.interceptors.request.use(function (config) {
// //   console.log(`${config.method}请求 ${config.url} 路径 ${config.params} 参数`)
// //   // 在发送请求之前做些什么
// //   return config;
// // }, function (error) {
// //   // 对请求错误做些什么
// //   return Promise.reject(error);
// // });
// // // 添加响应拦截器
// // instance.interceptors.response.use(function (response) {
// //   // 对响应数据做点什么
// //   console.log(`返回${JSON.stringify(response.data)}`)
// //   return response;
// // }, function (error) {
// //   // 对响应错误做点什么
// //   return Promise.reject(error);
// // });
// Vue.prototype.$http=instance
// Vue.mixin({
//   methods:{
//     $get(url,data){
//       console.log("哈哈")
//       return  instance.get(url,{
//         params:data
//       }).catch(err =>{
//         if (err.message===' Network Error'){
//           this.$fail("服务器异常,请稍后重试")
//         }
//       })
//     },
//     $post(url,data) {
//       console.log("哈哈")
//       var pdd=  request.instance.post(url,data)
//       pdd.catch(err =>{
//         if (err.message===' Network Error'){
//           this.$fail("服务器异常,请稍后重试")
//         }else {
//           if (err.message==='Request failed with status code 404'){
//             this.$fail("网络/路径异常,请联系相关人员检查")
//           }
//         }
//       })
//       return pdd
//     }
//   }
// })
