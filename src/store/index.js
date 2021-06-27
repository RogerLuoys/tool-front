import Vue from 'vue'
import Vuex from 'vuex'
import commonFactory from './modules/common-factory'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    commonFactory
  }
})

export default store
