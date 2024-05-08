<template>
    <<div class="d-flex justify-center  mb-6">
      <v-card flat>
      <h1>Log-in</h1>
      <p>Accedi al nostro servizio!</p>
      <v-form v-on:submit.prevent="login">
      <v-text-field label="Email" variant="outlined" v-model="email"></v-text-field>
      <v-text-field label="Password" variant="outlined" v-model="password"></v-text-field>
      <v-btn variant="outlined" @click="login"> Accedi</v-btn>
      </v-form> 
      </v-card>
    </div>
  </template>

  <script setup>
  import {ref} from "vue"
  const email=ref()
  const password=ref()
  function login(){
    console.log(email.value)
    console.log(password.value)
  }
  </script>