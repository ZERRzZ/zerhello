<style>
.main {
  width: 100%;
  height: 70%;
  overflow: auto;
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
  align-content: flex-start;
}

.user-box {
  width: 100px;
  height: 120px;
}

.img-link {
  width: 100%;
  display: block;
}

.img {
  width: 100%;
}
</style>

<template>
  <div class="main">
    <!-- 欢迎词 -->
    <span v-show="info.isFirst">欢迎使用</span>
    <!-- 加载中 -->
    <span v-show="info.isLoad">加载中...</span>
    <!-- 用户列表 -->
    <div v-show="info.users.length" class="user-box" v-for="u in info.users" :key="u.login">
      <a class="img-link" :href="u.html_url">
        <img class="img" :src="u.avatar_url">
      </a>
      <span>{{u.login}}</span>
    </div>
    <!-- 错误信息 -->
    <span v-show="info.err">{{info.err}}</span>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      info: {
        isFirst: true,
        isLoad: false,
        users: [],
        err: ''
      }
    }
  },
  mounted() {
    this.$bus.$on('getUsers', dataObj => {
      this.info = { ...this.info, ...dataObj }
      console.log(dataObj)
    })
  }
}
</script>