import Vue from 'vue'
import Vuex from 'vuex'
import factory from './modules/factory'
import slaveNode from './modules/slaveNode'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    factory,
    slaveNode,
    user
  }
})

export default store
