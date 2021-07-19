import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import config from '@/views/config/index'
import commonFactory from '@/views/common-factory/index'
import commonFactoryDetail from '@/views/common-factory/detail'
import customFactory from '@/views/custom-factory/index'
import device from '@/views/device/index'
import testCase from '@/views/test-case/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/config',
      name: 'config',
      component: config
    },
    {
      path: '/commonFactory',
      name: 'commonFactory',
      component: commonFactory
    },
    {
      path: '/commonFactoryDetail/:id',
      name: 'commonFactoryDetail',
      component: commonFactoryDetail
    },
    {
      path: '/customFactory',
      name: 'customFactory',
      component: customFactory
    },
    {
      path: '/device',
      name: 'device',
      component: device
    },
    {
      path: '/testCase',
      name: 'testCase',
      component: testCase
    }
  ]
})
