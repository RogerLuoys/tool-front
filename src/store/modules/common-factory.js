
// initial state
// shape: [{ id, quantity }]
const state = () => ({
  isSelectDBVisible: false,
  selectedDeviceId: 0
})

// mutations
const mutations = {
  setSelectDBDialog (state, isSelectDBVisible) {
    state.isSelectDBVisible = isSelectDBVisible
  },
  selectDataSource (state, deviceId) {
    state.selectedDeviceId = deviceId
  }
}

export default {
  // namespaced: true,
  state,
  mutations
}
