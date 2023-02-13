<template>
    <h1>Login</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="login">Submit</button></p>
  </template>

  <script setup>
  import { ref } from 'vue'
    const email = ref('')
    const password = ref('')
    const login = () => {
    }
  </script>