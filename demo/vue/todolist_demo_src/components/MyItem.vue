<style scoped>
.item-label {
  width: 100%;
  height: 30px;
  padding: 0 10px;
  transition: all .3s;
  display: flex;
  gap: 5px;
  align-items: center;
  position: relative;
}

.item-label:hover {
  background: var(--theme-light);
}

.item-label:hover .edit {
  opacity: 1;
}

.edit-text {
  width: 100px;
  text-indent: 5px;
  border-radius: 5px;
  transition: all .3s;
}

.edit-text:focus {
  border-color: var(--theme-dark);
}

.edit {
  height: 80%;
  color: #fff;
  background: var(--theme-dark);
  border-radius: 5px;
  opacity: 0;
  transition: all .3s;
  position: absolute;
  right: 60px;
}

.del {
  height: 80%;
  color: #fff;
  background: red;
  border-radius: 5px;
  transition: all .3s;
  position: absolute;
  right: 10px;
}

.del:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 5px var(--gray-middle);
}
</style>

<template>
  <label class="item-label">
    <input type="checkbox" :checked="todo.done" @change="handleTodo(todo.id)">
    <span v-show="!todo.isEdit">{{todo.name}}</span>
    <input class="edit-text" type="text" ref="edit-text" v-show="todo.isEdit" :value="todo.name" @blur="handleBlur($event, todo)">
    <input class="edit" type="button" value="编辑" v-show="!todo.isEdit" @click="handleEdit(todo)">
    <input class="del" type="button" value="删除" @click="handleDelete(todo.id)">
  </label>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: 'MyItem',
  props: ['todo'],
  methods: {
    handleTodo(id) {
      this.$bus.$emit('checkTodo', id)
    },
    handleDelete(id) {
      // this.$bus.$emit('deleteTodo', id)
      pubsub.publish('deleteTodo', id)
    },
    handleEdit(todo) {
      todo.isEdit = true
      // this.$set(todo, 'isEdit', true)
      this.$nextTick(() => {
        this.$refs['edit-text'].focus()
      })
    },
    handleBlur(e, todo) {
      todo.isEdit = false
      if (!e.target.value.trim()) return alert('输入不能为空!')
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
    }
  }
}
</script>