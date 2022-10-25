export default {
  namespaced: true,
  state: {
    personList: [
      { id: '001', name: 'zerson' }
    ]
  },
  actions: {

  },
  mutations: {
    ADD_PERSON(state, value) {
      state.personList.unshift(value)
    }
  },
  getters: {

  }
}