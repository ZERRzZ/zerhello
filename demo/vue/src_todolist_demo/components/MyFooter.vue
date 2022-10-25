<style scoped>
footer {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  gap: 5px;
  align-items: center;
}

.del {
  height: 100%;
  color: #fff;
  background: red;
  border-radius: 5px;
  transition: all .3s;
}

.del:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 5px var(--gray-middle);
}
</style>

<template>
  <footer v-if="total">
    <div class="footer-left">
      <input type="checkbox" v-model="isAll">
      <span>已完成 {{doneTotal}} / 全部 {{total}}</span>
    </div>
    <input class="del" type="button" value="清除已完成的任务" @click="clearTodo">
  </footer>
</template>

<script>
export default {
  name: 'MyFooter',
  props: ['todos'],
  computed: {
    isAll: {
      get() {
        return this.total === this.doneTotal
      },
      set(v) {
        this.$emit('checkAllTodo', v)
      }
    },
    total() {
      return this.todos.length
    },
    doneTotal() {
      return this.todos.filter(v => v.done).length
    }
  },
  methods: {
    clearTodo() {
      this.$emit('clearTodo')
    }
  }
}
</script>