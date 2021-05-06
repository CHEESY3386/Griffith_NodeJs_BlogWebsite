import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/Blog'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'feed',
    component: Blog
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/signup',
    name: 'signup',
    component: Signup
  }]
})