<template>
  <div>
    <input type="button" ref="btn" value="获取DOM元素" @click="getDOM">
    <HelloWorld ref="helloworld" />
    <br />
    <MySchool ref="school" />
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import MySchool from './components/MySchool.vue'

  export default {
    name: 'App',
    components: { 
      HelloWorld,
      MySchool
    },
    methods: {
      getDOM() {
        console.log(this.$refs)
      }
    }
  }
</script>