import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('./../page/login/login') //登录页
const msite = () => import('./../page/msite/msite') //后台系统首页
const home = () => import('./../page/msite/home/home') //后台系统首页
const userList = () => import('./../page/msite/userList/userList') //后台系统用户列表
const goodList = () => import('./../page/msite/goodList/goodList') //后台系统商品列表
const orderList = () => import('./../page/msite/orderList/orderList') //后台系统订单列表
const orderDetails = () => import('./../page/msite/orderList/orderDetails/orderDetails') //后台系统订单列表订单详情

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/msite',
      name: 'msite',
      component: msite,
      children:[
        {
          path:'/msite/home',
          component: home
        },
        {
          path: '',
          redirect: '/msite/home'
        },
        {
          path:'/msite/userList',
          component: userList
        },
        {
          path:'/msite/goodList',
          component: goodList
        },
        {
          path:'/msite/orderList',
          component: orderList,
          children:[
            {
              path:'/msite/orderList/orderDetails',
              component: orderDetails
            }
          ]
        },
      ]
    },
  ]
})
