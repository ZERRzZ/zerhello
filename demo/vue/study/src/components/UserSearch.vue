<style>
.search {
  width: 100%;
  height: 30%;
  padding-left: 3em;
  background: var(--gray-light);
  display: flex;
  flex-flow: column;
  gap: .6em;
  justify-content: center;
}

.search-input {
  display: flex;
  gap: .5em;
}

.search-text,
.search-btn {
  height: 2em;
  border-radius: .4em;
  transition: all .3s;
  background: #fff !important;
}

.search-text:hover,
.search-btn:hover {
  border-color: var(--theme-dark);
  color: var(--theme-dark);
}

.search-text {
  text-indent: .5em;
}
</style>

<template>
  <div class='search'>
    <span>Search Github Users</span>
    <div class="search-input">
      <input class="search-text" type="text" placehoder="enter the name" v-model="keyWord">
      <input class="search-btn" type="button" value="Search" @click="search">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserSearch',
  data() {
    return {
      keyWord: ''
    }
  },
  methods: {
    search() {
      this.$bus.$emit('getUsers', {
        isFirst: false,
        isLoad: true,
        users: [],
        err: ''
      })
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        res => {
          this.$bus.$emit('getUsers', {
            isLoad: false,
            users: res.data.items,
            err: ''
          })
        }, err => {
          console.log(err)
          this.$bus.$emit('getUsers', {
            isLoad: false,
            users: [],
            err: err.message
          })
        }
      )
    }
  }
}
</script>