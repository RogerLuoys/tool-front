
const state = () => ({
  userName: ''
})

const mutations = {
  setUserName (state, userName) {
    state.userName = userName
  }
}

export default {
  state,
  mutations
}
