<template>

<h1 class="title">Login</h1>

<div class="box">
  <div class="field">
    <label class="label">Email</label>
    <div class="control">
        <input type="text" placeholder="e.g. alex@example.com" v-model="email" />
    </div>
  </div>

  <div class="field">
    <label class="label">Password</label>
    <div class="control">
        <input type="password" placeholder="********" v-model="password" />
    </div>
  </div>

  <p><button class="button is-primary" @click="login">Submit</button></p>

</div>
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