import Vue from 'vue'
import Vuex from 'vuex'

import countOption from './count'
import personOption from './person'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    countOption,
    personOption
  }

  // // 准备 state 用于存储数据
  // state: {
  //   sum: 0,
  //   name: 'sadanya',
  //   action: 'study',
  //   personList: [
  //     { id: '001', name: 'zerson' }
  //   ]
  // },
  // // 准备 actions 用于响应组件中的动作
  // actions: {
  //   // add(context, value) {
  //   //   console.log('actions', context, value)
  //   //   context.commit('ADD', value)
  //   // },
  //   // sub(context, value) {
  //   //   context.commit('SUB', value)
  //   // },
  //   addOdd(context, value) {
  //     context.state.sum % 2 && context.commit('ADD', value)
  //   },
  //   addWait(context, value) {
  //     setTimeout(() => context.commit('ADD', value), 500)
  //   }
  // },
  // // 准备 mutations 用于操作数据
  // mutations: {
  //   ADD(state, value) {
  //     state.sum += value
  //   },
  //   SUB(state, value) {
  //     state.sum -= value
  //   },
  //   ADD_PERSON(state, value) {
  //     state.personList.unshift(value)
  //   }
  // },
  // getters: {
  //   bigSum(state) {
  //     return state.sum * 10
  //   }
  // }
})