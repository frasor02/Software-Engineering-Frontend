<template>
    <<div class="d-flex justify-center  mb-6">
      <v-card flat>
      <h1>Registrazione</h1>
      <p>Registrati al nostro servizio!</p>
      <v-form v-on:submit.prevent="registrazione">
      <v-text-field label="Email" variant="outlined" v-model="email"></v-text-field>
      <v-text-field label="Password" variant="outlined" v-model="password"></v-text-field>
      <v-text-field label="Conferma Password" variant="outlined" v-model="confirmPassword"></v-text-field>
      <v-checkbox label="Dichiaro di essere maggiorenne" v-model="isAdult"></v-checkbox>
      <v-btn variant="outlined" @click="registrazione"> Conferma registrazione</v-btn>
      </v-form> 
      </v-card>
    </div>
  </template>

  <script setup>
  import {ref} from "vue"
  const email=ref()
  const password=ref()
  const confirmPassword = ref()
  const isAdult = ref()
  function registrazione(){
    console.log(email.value)
    console.log(password.value)

    if (password.value !== confirmPassword.value) {
    alert("Le password non corrispondono.")
    return
  }
  }
  </script>
  