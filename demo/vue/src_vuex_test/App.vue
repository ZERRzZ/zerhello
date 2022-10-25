<style>

</style>

<template>
  <div>
    <VueCount></VueCount>
    <hr />
    <MyPerson></MyPerson>
  </div>
</template>

<script>
import VueCount from './components/VueCount'
import MyPerson from './components/MyPerson'

export default {
  name: 'App',
  components: {
    VueCount,
    MyPerson
  }
}
</script>