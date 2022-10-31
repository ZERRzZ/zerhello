<style>

</style>

<template>
  <div :style="{ opacity }">
    <span>News 1 <input type="text"></span>
    <span>News 2 <input type="text"></span>
    <span>News 3 <input type="text"></span>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  data() {
    return {
      timer: undefined,
      opacity: 1
    }
  },
  // 激活
  activated() {
    this.timer = setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  // 取消激活
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>