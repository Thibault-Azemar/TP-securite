<template>
  <div>
    <nav>
      <router-link to="/"> Home </router-link> |
      <span v-if="isLoggedIn">
        <button @click="sign">Logout</button>
      </span>
      <span v-else>
        <router-link to="/register"> Register </router-link> |
        <router-link to="/login"> Login </router-link>
      </span>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { ref } from 'vue' // used for conditional rendering
  import { useRouter } from 'vue-router'
  import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth'

  const router = useRouter()
  const isLoggedIn = ref(false)
  const auth = getAuth()

  // runs after firebase is initialized
  onAuthStateChanged(auth, function(user) {
      if (user) {
        isLoggedIn.value = true // if we have a user
      } else {
        isLoggedIn.value = false // if we do not
      }
  })
  const sign = () => {
    signOut(auth)
    router.push('/')
  }
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
