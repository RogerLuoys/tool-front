const state = () => ({
  poList: null,
  dbList: null,
  supperCaseList: null,
  isUpdateCase: false,
  isQueryCase: null
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
