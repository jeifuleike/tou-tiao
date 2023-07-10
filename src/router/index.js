import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect: '/home', // 添加重定向配置
    children:[
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home'),
      },
      {
        path: '/qa',
        name: '问答',
        component: () => import('@/views/qa'),
      },
      {
        path: '/video',
        name: '视频',
        component: () => import('@/views/video'),
      },
      {
        path: '/my',
        name: '我的',
        component: () => import('@/views/my'),
      },
    ]
  },
  {
    path: '/search',
    name: '搜索',
    component: () => import('@/views/search')
  },{
    path:'/article/:articleId',
    name:'article',
    component: () => import('@/views/article'),
    props: true //开启Props传参，就是把路由参数映射到组件内的props数据中
  },{
    path:'/user/profile',
    name:'user-profile',
    component: () => import('@/views/user-profile'),
  },{
    path:'/user/history',
    name:'history',
    component:() =>import('@/views/collect')
  },{
    path:'/container',
    name:'container',
    component:() =>import('@/views/container')
  }
]

const router = new VueRouter({
  routes
})

export default router
