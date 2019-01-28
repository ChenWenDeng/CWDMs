// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import '@/assets/style/reset.css'/*引入公共样式*/

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入vue-echarts插件
import ECharts from 'vue-echarts/components/ECharts'
// 导入echarts的图形类型
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'

import VueLazyLoad from 'vue-lazyload'

//使用elementUI
Vue.use(ElementUI);
//使用axios
Vue.use(axios);


// 全局注册chart组件
Vue.component('chart', ECharts)

Vue.use(VueLazyLoad,{
  loading:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547747830330&di=76fc61899c3d282a51835a4b42f3d9a4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201511%2F25%2F20151125141303_c2LyT.thumb.700_0.gif'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //使用上store
  components: { App },
  template: '<App/>'
})


router.beforeEach((to, from, next) => {
  //store中定义获取用户信息的函数  adminId
  //adminId为空说明用户未登录
  let adminId = store.state.adminId;
  if (adminId==0) {//未登录
      if (to.path !== '/') {//跳转到登录页
          return next({path: '/'});
      }else {
          next();
      }
  }else {//已登录
      if (to.path === '/msite') {//跳转到首页
          return next({path: '/msite'});
      }
      next();
  }
});
