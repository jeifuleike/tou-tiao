import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//加载全局样式
import './styles/index.less'
import 'amfe-flexible'
//导入vant组件库
import Vant from 'vant';
import './utils/dayjs'
import 'vant/lib/index.css';
import './/utils/dayjs'
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
