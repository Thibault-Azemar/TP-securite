<template>
  <div>
    <nav>
      <router-link class="menu-item" to="/"> Home </router-link> |
      <span v-if="isLoggedIn">
        <a class="menu-item" @click="sign">Logout</a>
      </span>
      <span v-else>
        <router-link class="menu-item" to="/register"> Register </router-link> |
        <router-link class="menu-item" to="/login"> Login </router-link>
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
@import "assets/styles/main.css";
</style>
