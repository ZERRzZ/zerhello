<template>
  <div>
    <input type="button" ref="btn" value="获取DOM元素" @click="getDOM">
    <HelloWorld ref="helloworld" name='ZERRzZ'/>
    <br />
    <HelloWorld ref="helloworld" name='SADANYA'/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: { HelloWorld },
    methods: {
      getDOM() {
        console.log(this.$refs)
      }
    }
  }
</script>