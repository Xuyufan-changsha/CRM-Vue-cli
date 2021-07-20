import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Index from '../components/index.vue'
// import Login from '../components/login.vue'
import User from '../components/blog/user.vue'
import Article from '../components/blog/article.vue'
import Reimbursement from '../components/blog/reimbursement.vue'
import Comment from '../components/blog/comment.vue'
import Form from '../components/element/e_form.vue'
import NavMenu from '../components/element/e_nav.vue'
import Pagination from '../components/element/e_page.vue'
import Tab from '../components/element/e_tab.vue'
import Step from '../components/element/e_step.vue'

Vue.use(Router)

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: '导航一',
  //     component: HelloWorld
  //   },{
  //     path: '/login',
  //     name: 'Login',
  //     component: Login
  //   },
  //   {
  //     path: '/register',
  //     name: 'Register',
  //     component: Register
  //   }
  // ]

  mode: 'hash',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    redirect: 'login'
  }, {
    path: '/login',
    component: Login,
    name: 'login',
  }, {
    path: '/register',
    component: Register,
    name: 'register',
  }, {
    path: '/index',
    component: Index,
    meta: {
      isLogin: true
    },
    children: [{
      path: '/',
      name: 'index',
      redirect: 'user',
    }, {
      path: '/index/user',
      component: User,
      name: 'user',
      meta: {
        isLogin: true
      }
    }, {
      path: '/index/article',
      component: Article,
      name: 'article',
      meta: {
        isLogin: true
      }
    }, {
      path: '/index/reimbursement',
      component: Reimbursement,
      name: 'reimbursement',
      meta: {
        isLogin: true
      }
    }
    ]
  }]
})

