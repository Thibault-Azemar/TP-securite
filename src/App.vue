<template>
  <div>
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/register"> Register </router-link> |
      <router-link to="/login"> Login </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
