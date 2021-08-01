import Vue from 'vue'
import Vuex from 'vuex'
import factory from './modules/factory'
import slaveNode from './modules/slaveNode'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    factory,
    slaveNode
  }
})

export default store
