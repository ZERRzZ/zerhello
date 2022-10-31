<style>

</style>

<template>
  <div>
    <h2>I am Home Page</h2>
    <div>
      <ul>
        <li>
          <router-link to="/home/news" active-class="active">News</router-link>
        </li>
        <li>
          <router-link to="/home/message" active-class="active">Message</router-link>
        </li>
      </ul>
    </div>
    <keep-alive include="NewsPage">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>