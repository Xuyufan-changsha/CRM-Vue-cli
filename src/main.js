// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import store from './store/index'
import i18n from './i18n/i18n';

Vue.use(elementUI)

import axios from 'axios'
Vue.prototype.axios = axios
import qs from 'qs';
Vue.prototype.qs = qs;
Vue.config.productionTip = false

// router.beforeEach((to,from,next) =>{
//   if(to.meta.requireAuth){
//     if(store.state.currentUser !== null && store.state.currentUser){
//       next()
//     }
//     else{
//       next({
//         path:'/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   }
//   else{
//     next()
//   }
// })
// /* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  let getFlag = localStorage.getItem('Flag') /* 这里是判断用户是否登录过，因为在用户登录后会在localStroage内存储Flag=isLogin */
  if (getFlag === 'isLogin') { /* 如果存在Flag并且为isLogin意味着用户登录，这时修改vux内state下isLogin的状态 */
    store.state.isLogin = true
    next()
    if (!to.meta.isLogin) { /* 如果在有登录状态的情况下前往不需要权限的路由路径，则判定为退出登录，进行提示并跳转登录页 */
      next({
        path: '/login'
      })
    }
  } else {
    if (to.meta.isLogin) { /* 如果没有登录状态且要去往需要权限的路径时跳转登录页并进行提示 */
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  window.scroll(0, 0)
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
