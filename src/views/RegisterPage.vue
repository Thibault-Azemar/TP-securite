<template>
<div class="box">
  <h1 class="title">Create an Account</h1>

  <div class="field">
    <label class="label">Email</label>
    <div class="control has-icons-left">
      <input class="input" type="text" placeholder="Email" v-model="email" />
      <span class="icon is-medium is-left">
        <i class="fas fa-envelope"></i>
      </span>
    </div>
  </div>
  <div class="field">
    <label class="label">Password</label>
    <div class="control">
      <input class="input" type="password" placeholder="Password" v-model="password" />
    </div>
  </div>
  <div class="field">
    <label class="label">Repeat Password</label>
    <div class="control">
      <input class="input" type="password" placeholder="Repeat password" v-model="password2" />
    </div>
  </div>

  <p><button class="button is-primary" @click="register">Submit</button></p>

  <p class="help is-danger" v-if="password.length < 8"> Le mot de passe doit faire 8 caractères minimum</p>
  <p class="help is-danger" v-if="password.search(/(?=.*?[a-z])/)">Le mot de passe doit contenir au moins une lettre minuscule</p>
  <p class="help is-danger" v-if="password.search(/(?=.*?[A-Z])/)">Le mot de passe doit contenir au moins une lettre majuscule</p>
  <p class="help is-danger" v-if="password.search(/(?=.*?[0-9])/)">Le mot de passe doit contenir au moins un chiffre</p>
  <p class="help is-danger" v-if="password.search(/(?=.*?[#?!@$%^&*-])/)">Le mot de passe doit contenir au moins un caractère spécial</p>
  <p class="help is-danger" v-if="password !== password2 && password2 != ''">Les mots de passe ne correspondent pas</p>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

// Importer l'objet db du main.js
import db from '../main'

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
      // je souhaite ajouter un document dans la collection users avec email et password
      const userRef = db.collection('users').doc(email.value)
      userRef.set({
        email: email.value,
        password: password.value
      })

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