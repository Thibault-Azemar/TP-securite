<template>
  <div>
    <nav class="breadcrumb is-centered is-large" aria-label="breadcrumbs ">
    <ul v-if="isLoggedIn">
      <li><router-link class="link is-info" to="/"> Home </router-link></li>
      <li><router-link class="link is-info" to="/wishlist"> Wishlist </router-link></li>
      <li id="logout"><a class="link is-info" @click="sign">Logout</a></li>
    </ul>
    <ul v-else>
      <li><router-link class="link is-info" to="/"> Home </router-link></li>
      <li><router-link class="link is-info" to="/register"> Register </router-link></li>
      <li><router-link class="link is-info" to="/login"> Login </router-link></li>
    </ul>
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