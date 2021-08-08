const state = () => ({
  slaveHost: 'http://192.200.208.16:9011/'
})

// mutations
const mutations = {
  setSlaveHost (state, url) {
    state.slaveHost = url
  }
}

export default {
  state,
  mutations
}
