<template>
  <h1>Create an Account</h1>
  <p class="required"><input type="text" required="required" placeholder="Email" v-model="email" /></p>
  <p class="required"><input type="password" required="required" placeholder="Password" v-model="password" /></p>
  <p class="required"><input type="password" required="required" placeholder="Repeat password" v-model="password2" /></p>
  <p><button @click="register">Submit</button></p>
  <p v-if="password.length < 8"> Le mot de passe doit faire 8 caractères minimum</p>
  <p v-if="password.search(/(?=.*?[a-z])/)">Le mot de passe doit contenir au moins une lettre minuscule</p>
  <p v-if="password.search(/(?=.*?[A-Z])/)">Le mot de passe doit contenir au moins une lettre majuscule</p>
  <p v-if="password.search(/(?=.*?[0-9])/)">Le mot de passe doit contenir au moins un chiffre</p>
  <p v-if="password.search(/(?=.*?[#?!@$%^&*-])/)">Le mot de passe doit contenir au moins un caractère spécial</p>
  <p v-if="password !== password2">Les mots de passe ne correspondent pas</p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const password2 = ref('')

const register = () => {
  const auth = getAuth();
  if (!email.value.search(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) 
  {
    if (password.value == password2.value && password.value.length >= 8 && !password.value.search(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) 
    {
      createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log(userCredential)
        router.push('/');
      })
      .catch(error => {
        console.log(error.code)
        alert(error.message);
      });
    }
    else
    {
      alert('Le mot de passe ne correspond pas aux critères')
    }
  }
  else
  {
    alert('L\'adresse email n\'est pas valide')
  }
}
</script>