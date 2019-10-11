import  './message'
import  Vue from  'vue'
import axios from 'axios'
import config from '../config'
import './router'
/**
 * 配置路径默认地址url
 * @type {AxiosInstance}
 */
const instance = axios.create({
  baseURL: 'http://localhost:8762/user'
});
Vue.prototype.$http=instance
Vue.mixin({
  methods:{
    $get(url,data){
      console.log("哈哈")
      return  instance.get(url,{
        params:data
      }).catch(err =>{
        console.log(err)
        if (err.message==='Network Error'){
          this.$fail("服务器异常,请稍后重试")
        }
      })
    },
    $post(url,data) {
      console.log("哈哈")
      var pdd=  instance.post(url,data)
      pdd.catch(err =>{
        console.log(err.message)
        if (err.message==='Network Error'){
          this.$fail("服务器异常,请稍后重试")
        }else {
          if (err.message==='Request failed with status code 404'){
            this.$fail("网络/路径异常,请联系相关人员检查")
          }
        }
      })
      return pdd
    }
  }
})
/**权限指令**/
Vue.directive('has', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      console.log("指令打印"+binding.value)
      console.log("打印el"+el.parentNode)
      el.parentNode.removeChild(el);
    }
  }
});
//权限检查方法
Vue.prototype.$_has = function(value) {
  console.log("进入权限按钮检查"+value)
 // debugger
  let isExist=false;
  let buttonpermsStr=sessionStorage.getItem(config.CACHE_KEY.LOCCECT);
 // console.log(buttonpermsStr)
  if(buttonpermsStr==undefined || buttonpermsStr==null){
    return false;
  }
  let strings =buttonpermsStr.split(",").toString()
  if (strings.indexOf(value)>=0){
    return true;
  } else {
    return false
  }
  return isExist;
};

