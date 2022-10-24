<style>
@import './assets/style.css';

.app {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-flow: column;
  gap: 1em;
}
</style>

<template>
  <div class="app">
    <UserSearch />
    <UserList />
  </div>
</template>

<script>
import UserSearch from './components/UserSearch'
import UserList from './components/UserList'

export default {
  name: 'App',
  components: {
    UserSearch,
    UserList
  }
}
</script>