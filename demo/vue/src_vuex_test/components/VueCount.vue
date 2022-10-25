<style scoped>

</style>

<template>
  <div>
    <h1>当前求和为: {{ sum }}</h1>
    <h1>放大 10 倍: {{ bigSum }}</h1>
    <h2>下方组件的总人数: {{ personList.length }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <input type="button" @click="add(n)" value="+">
    <input type="button" @click="sub(n)" value="-">
    <input type="button" @click="jishuAdd(n)" value="当前求和为奇数再加">
    <input type="button" @click="waitAdd(n)" value="等等再加">
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'VueCount',
  data() {
    return {
      n: 1
    }
  },
  computed: {
    ...mapState('countOption', ['sum', 'action', 'name']),
    ...mapState('personOption', ['personList']),
    ...mapGetters('countOption', ['bigSum'])
  },
  methods: {
    ...mapMutations('countOption', {
      add: 'ADD',
      sub: 'SUB'
    }),
    // add() {
    //   console.log(this)
    //   this.$store.commit('ADD', this.n)
    // },
    // sub() {
    //   this.$store.commit('SUB', this.n)
    // },
    ...mapActions('countOption', {
      jishuAdd: 'addOdd',
      waitAdd: 'addWait'
    }),
    // jishuAdd() {
    //   this.$store.dispatch('addOdd', this.n)
    // },
    // waitAdd() {
    //   this.$store.dispatch('addWait', this.n)
    // }
  }
}
</script>