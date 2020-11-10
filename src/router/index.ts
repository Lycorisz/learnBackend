import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import("@/views/Login/Login.vue"),
    beforeEnter: (to:any,from:any,next:any) => {
       const isLogin = localStorage.tsToken?true:false;
       isLogin?next('/'):next();
      }
  },
  {
    path:'/password',
    name:'Password',
        component: ()=>import("@/views/Login/Password.vue")

  }
]

const router:any = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router guard
router.beforeEach((to:any,from:any,next:any)=>{
  // 判断token
  const isLogin = localStorage.tsToken?true:false;
  // 判断路径，如果是login或找回密码页面直接跳转，否则判断token标识，true则继续跳转，false则跳转到login。
  if(to.path=="/login"||to.path == "/password"){
    next();
  }else{
    isLogin?next():next('/login');
  }
})

export default router
