import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login.vue'
import Home from './views/Home/Home.vue'
import User from './views/User/User.vue'
import Roles from './views/Roles/Roles.vue'
import Rights from './views/Rights/Rights.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          // 加/不加/的区别，加/就是/user,不加/就是/home/user
          path: '/user',
          component: User
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        }
      ]
    }
  ]
})

// 注册一个导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }

  if (localStorage.getItem('token')) {
    next()
  } else {
    router.push('/login')
  }
  // console.log('导航守卫工作啦')
  // next这里提供的方法，是用来进行页面的跳转的
  // 如果不调用这个方法，那么页面就不会进入
})

export default router
