<style scoped>
.message-detail {
  display: flex;
  gap: 1em;
}
</style>

<template>
  <div class="message-detail">
    <span>message id: {{ id }}</span>
    <span>message title: {{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'MessageDetail',
  props: ['id', 'title']
}
</script>