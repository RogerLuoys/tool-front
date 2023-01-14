import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import login from '@/views/home/login'
import resource from '@/views/resource/index'
import automation from '@/views/automation/index'
import caseDetail from '@/views/automation/caseDetail'
import config from '@/views/config/index'
import suite from '@/views/suite/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/config',
      name: 'config',
      component: config
    },
    {
      path: '/suite',
      name: 'suite',
      component: suite
    },
    {
      path: '/resource',
      name: 'resource',
      component: resource
    },
    {
      path: '/automation',
      name: 'automation',
      component: automation
    },
    {
      path: '/caseDetail/:id',
      name: 'caseDetail',
      component: caseDetail
    }
  ]
})
