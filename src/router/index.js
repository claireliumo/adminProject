import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/signin/signin'
import Signup from '@/components/signin/signup'
import Main from '@/components/main/main'
import {rootRedirect} from './routes'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      beforeEnter: rootRedirect
    },
    {
      name: 'signin',
      path: '/signin',
      component: Signin
    },
    {
      name: 'signup',
      path: '/signup',
      component: Signup
    },
    {
      name: 'main',
      path: '/main',
      component: Main
    }
  ]
})
