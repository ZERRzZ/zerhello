<style scoped>
header {
  width: 100%;
  height: 30px;
  padding: 0 10px;
}

input[type='text'] {
  width: 100%;
  height: 100%;
  padding: 5px 0;
  border-radius: 5px;
  text-indent: 10px;
}
</style>

<template>
  <header>
    <input type="text" @keyup.enter="add" placeholder="请输入你的任务名称, 按回车键确认">
  </header>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'MyHeader',
  data() {
    return {
      // name: ''
    }
  },
  methods: {
    add(e) {
      // 校验数据
      if (!e.target.value.trim()) return alert('请输入内容!')
      let todo = {
        id: nanoid(),
        name: e.target.value,
        done: false,
        isEdit: false
      }
      this.$emit('addTodo', todo)
      e.target.value = ''
    }
  }
}
</script>