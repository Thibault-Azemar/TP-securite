<template>
    <h1>Login</h1>
    <p class="required"><input type="text" required="required" placeholder="Email" v-model="email" /></p>
    <p class="required"><input type="password" required="required" placeholder="Password" v-model="password" /></p>
    <p><button @click="login">Submit</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const errMsg = ref()

const email = ref('')
const password = ref('')

const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    console.log(userCredential)
    router.push('/');
    })
    .catch(error => {
        print(error)
        switch (error.code) {
          case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              errMsg.value = 'Incorrect password'
              break
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
      });
}
</script>

<style>
</style>