
const state = () => ({
  loginInfo: '',
  userId: '',
  userName: ''
})

const mutations = {
  setUserName (state, userName) {
    state.userName = userName
  },
  setUserId (state, userId) {
    state.userId = userId
  }
}

export default {
  state,
  mutations
}
