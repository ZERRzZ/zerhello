export default {
  namespaced: true,
  state: {
    sum: 0,
    name: 'sadanya',
    action: 'study',
  },
  actions: {
    addOdd(context, value) {
      context.state.sum % 2 && context.commit('ADD', value)
    },
    addWait(context, value) {
      setTimeout(() => context.commit('ADD', value), 500)
    }
  },
  mutations: {
    ADD(state, value) {
      state.sum += value
    },
    SUB(state, value) {
      state.sum -= value
    },
  },
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
}
