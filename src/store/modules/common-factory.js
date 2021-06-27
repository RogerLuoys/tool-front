
// initial state
// shape: [{ id, quantity }]
const state = () => ({
  pointId: '0',
  expendPointCount: 0
})

// mutations
const mutations = {
  setPointId (state, pointId) {
    state.pointId = pointId
  },
  incrementExpendPointCount (state) {
    state.expendPointCount++
  }
}

export default {
  // namespaced: true,
  state,
  mutations
}
