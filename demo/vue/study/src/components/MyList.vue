<style scoped>
.list {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  display: flex;
  flex-flow: column;
  gap: 5px;
}
</style>

<template>
  <div class="list">
    <TransitionGroup appear>
      <MyItem v-for="t in todos" :key="t.id" :todo="t" />
    </TransitionGroup>
  </div>
</template>

<script>
import MyItem from './MyItem.vue'

export default {
  name: 'MyList',
  components: {
    MyItem
  },
  props: ['todos']
}
</script>