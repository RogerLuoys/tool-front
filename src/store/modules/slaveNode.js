const state = () => ({
  slaveHost: 'http://192.200.208.111:9010/'
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
