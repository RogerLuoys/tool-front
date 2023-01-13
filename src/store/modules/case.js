const state = () => ({
  poList: null,
  dbList: null,
  supperCaseList: null
})

const mutations = {
  setPoList (state, list) {
    state.poList = list
  },
  setDbList (state, list) {
    state.dbList = list
  },
  setSupperCaseList (state, list) {
    state.supperCaseList = list
  }
}

export default {
  state,
  mutations
}
