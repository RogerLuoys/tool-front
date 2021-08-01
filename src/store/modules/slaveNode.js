const state = () => ({
  url: ''
})

// mutations
const mutations = {
  setSlaveUrl (state, url) {
    state.url = url
  }
}

export default {
  state,
  mutations
}
