<style scoped>

</style>

<template>
  <div>
    <h3>上方组件求和为: {{ $store.state.countOption.sum }}</h3>
    <input type="text" placeholder="please enter name" v-model="name">
    <input type="button" value="add" @click="add">
    <ul>
      <li v-for="p in $store.state.personOption.personList" :key="p.id">{{ p.name }}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'MyPerson',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    add() {
      if (!this.name) return alert('do not be white')
      let person = { id: nanoid(), name: this.name }
      this.$store.commit('personOption/ADD_PERSON', person)
    }
  }
}
</script>