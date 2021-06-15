import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index'
import config from '@/views/config/index'
import dataFactory from '@/views/data-factory/index'
import customFactory from '@/views/custom-factory/index'
import device from '@/views/device/index'

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
      path: '/dataFactory',
      name: 'dataFactory',
      component: dataFactory
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
    }
  ]
})
