<template>
  <div>
    <nav class="level" v-if="isLoggedIn">
        <p class="level-item has-text-centered">
          <router-link class="link is-info" to="/"> Home </router-link>
        </p>
        <p class="level-item has-text-centered">
          <a class="link is-info" @click="sign">Logout</a>
        </p>
    </nav>
    <nav class="level" v-else>
        <p class="level-item has-text-centered">
          <router-link class="link is-info" to="/"> Home </router-link>
        </p>
        <p class="level-item has-text-centered">
          <router-link class="link is-info" to="/register"> Register </router-link>
        </p>
        <p class="level-item has-text-centered">
          <router-link class="link is-info" to="/login"> Login </router-link>
        </p>
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