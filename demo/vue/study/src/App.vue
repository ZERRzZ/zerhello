<style>
@import './assets/style.css';

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  width: 300px;
  padding: 10px 0;
  border: 1px solid var(--gray-middle);
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  gap: 20px;
}

.v-enter-active {
  animation: move 1s reverse;
}

.v-leave-active {
  animation: move 1s;
}

@keyframes move {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>

<template>
  <div class="main">
    <MyHeader @addTodo="addTodo"></MyHeader>
    <MyList :todos="todos"></MyList>
    <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearTodo="clearTodo"></MyFooter>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import MyList from './components/MyList.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
    MyList
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos'))
    }
  },
  methods: {
    addTodo(value) {
      this.todos.unshift(value)
    },
    checkTodo(id) {
      let todo = this.todos.find(v => v.id === id)
      todo.done = !todo.done
    },
    deleteTodo(_, id) {
      if (confirm('确认删除?')) {
        this.todos = this.todos.filter(v => v.id !== id)
      }
    },
    checkAllTodo(value) {
      this.todos.forEach(v => v.done = value)
    },
    clearTodo() {
      this.todos = this.todos.filter(v => !v.done)
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(v) {
        console.log(v)
        localStorage.setItem('todos', JSON.stringify(v))
      },
    }
  },
  mounted() {
    this.$bus.$on('checkTodo', this.checkTodo)
    // this.$bus.$on('deleteTodo', this.deleteTodo)
    this.pubid = pubsub.subscribe('deleteTodo', this.deleteTodo)
    this.$bus.$on('updateTodo', (id, name) => {
      this.todos.find(v => v.id === id).name = name
    })
  },
  beforeDestroy() {
    this.$bus.$off('checkTodo')
    // this.$bus.$off('deleteTodo')
    pubsub.unsubscribe(this.pubid)
    this.$bus.$off('updateTodo')
  }
}
</script>