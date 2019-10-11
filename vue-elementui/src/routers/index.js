import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import('@/views/main'),
      meta: {
        title: "工作"
      },
      children: [
        {
          path: "",
          component: () => import('@/views/home'),
          meta: {
            title: "主页"
          }
        },
        {
          path: "/user",
          component: () => import('@/views/user/userList'),
          meta: {
            title: "用户列表"
          }
        },
        {
          path: "/role",
          component: () => import('@/views/user/role'),
          meta: {
            title: "角色管理"
          }
        },
        {
          path: "/permission",
          component: () => import('@/views/user/permission'),
          meta: {
            title: "权限管理"
          }
        },
        {
          path: "/datas",
          component: () => import('@/views/datas/datas'),
          meta: {
            title: "数据列表"
          }
        }

      ]
    },
    {
      path: "/login",
      component: () => import('@/views/account/login')
      , meta: {
        title: "登录",
        anonymous: true
      }
    }
  ]
})
import  config from  '@/config'
router.beforeEach((to, from, next) => {
  console.log("钩子函数执行")
  /*获取路径*/
  // console.log(to.path)
 //document.title=to.meta.title+'·zhangsan'
  //console.log(to.meta.anonymous+'need login')
 if (!to.meta.anonymous) {
   if (sessionStorage.getItem(config.CACHE_KEY.LOGIN_USER_NAME)) {
     next()
   } else {
     next('/login')
   }
    //  console.log(to.meta.anonymous+'need login')
  }else {
   next()
 }
})
export default router
