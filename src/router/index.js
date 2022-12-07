import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import login from '@/views/home/login'
import factory from '@/views/factory/index'
import factoryDetail from '@/views/factory/detail'
import resource from '@/views/resource/index'
import automation from '@/views/automation/index2'
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
      path: '/factory',
      name: 'factory',
      component: factory
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
      path: '/factoryDetail/:id',
      name: 'factoryDetail',
      component: factoryDetail
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
