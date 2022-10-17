<template>
  <div class="hello">
    <div>name：{{name}}</div>
    <div>address：{{address}}</div>
    <input type="button" value="查看VC" @click="getVC">
  </div>
</template>

<script>
import { mix } from '../mix'

export default {
  name: 'MySchool',
  data() {
    return {
      address: 'address'
    }
  },
  methods: {
    getVC() {
      console.log(this)
    }
  },
  mixins: [mix]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-size: 2em;
  background: skyblue;
}
</style>
