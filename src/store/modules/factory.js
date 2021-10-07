
// initial state
// shape: [{ id, quantity }]
const state = () => ({
  selectedDataSource: {
    driver: '',
    url: '',
    userName: '',
    password: ''
  }
})

// mutations
const mutations = {
  setDataSourceDialog (state, isSelectDSVisible) {
    state.isSelectDSVisible = isSelectDSVisible
  },
  setDataSource (state, dataSource) {
    state.selectedDataSource = dataSource
  }
}

export default {
  // namespaced: true,
  state,
  mutations
}
