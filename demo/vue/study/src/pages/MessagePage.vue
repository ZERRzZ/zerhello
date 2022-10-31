<style scoped>
.message {
  display: flex;
  flex-flow: column;
  gap: 1em;
}
</style>

<template>
  <div class="message">
    <router-link v-for="m in message" :key="m.id" :to="`/home/message/detail/${m.id}/${m.title}`">{{ m.title }}</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MessagePage',
  data() {
    return {
      message: [
        { id: '001', title: 'message1' },
        { id: '002', title: 'message2' },
        { id: '003', title: 'message3' }
      ]
    }
  }
}
</script>