<template>
  <div class="hello">
    <div>name：{{name}}</div>
    <div>address：{{address}}</div>
    <input type="button" value="查看VC" @click="getVC">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
  // props: [ 'naem' ] 
  // props: {
  //   name: String
  // }
  props:{
    name: {
      type: String, // 类型
      default: 'xxx', // 默认值
      required: true // 是否必传
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-size: 2em;
  background: skyblue;
}
</style>
