<style>
.nav {
  display: flex;
  gap: 1em;
}

.active {
  color: skyblue;
}
</style>

<template>
  <div>
    <h1>Vue Router Demo</h1>
    <div>
      <div class="nav">
        <router-link to="/about" active-class="active">About</router-link>
        <router-link to="/home" active-class="active">Home</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>