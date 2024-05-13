<template>
    <div class="d-flex justify-center  mb-6">
      <v-card flat>
      <h1>Registrazione</h1>
      <p>Registrati al nostro servizio!</p>
      <v-form v-on:submit.prevent="registrazione">
      <v-text-field :rules="ruleEmail" label="Email" variant="outlined" v-model="email"></v-text-field>
      <v-text-field :rules="rulePassword" label="Password" variant="outlined" v-model="password"></v-text-field>
      <v-text-field :rules="ruleConfirmPassword" label="Conferma Password" variant="outlined" v-model="confirmPassword"></v-text-field>
      <v-combobox :rules="ruleVeicolo" :items="['auto', 'moto', 'furgone', 'bus']" label="Tipo di veicolo" v-model="tipoVeicolo"></v-combobox>
      <v-text-field :rules="ruleTarga" label="Targa del veicolo" variant="outlined" v-model="targa"></v-text-field>
      <v-combobox :rules="rulePagamento" :items="['carta di credito', 'carta di debito', 'paypal']" label="Metodo di pagamento" v-model="metodoPagamento"></v-combobox>
      <v-checkbox :rules="ruleMaggiorenne" label="Dichiaro di essere maggiorenne" v-model="isAdult"></v-checkbox>
      <v-btn type="submit" svariant="outlined"> Conferma registrazione</v-btn>
      </v-form> 
      </v-card>
      <div v-if="errore"> errore </div>
    </div>
  </template>

  <script setup>
  import {response_registrazione, errore, fetchRegistrazione} from "../states/utente.js"
  import {ref} from "vue"
  const email=ref()
  const password=ref()
  const confirmPassword = ref()
  const isAdult = ref(false)
  const tipoVeicolo = ref()
  const metodoPagamento = ref()
  const targa = ref()

  function registrazione(){
    const re_email= /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/
    const re_password=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
    if(email.value && password.value && confirmPassword.value && isAdult.value && tipoVeicolo.value && metodoPagamento.value && targa.value ){
      if (password.value === confirmPassword.value && isAdult.value ) {
        if(re_email.test(email.value) && re_password.test(password.value)){
          fetchRegistrazione(email.value, password.value, metodoPagamento.value, tipoVeicolo.value, targa.value)
        }
      }
    }
  }

  let ruleEmail=[ () =>
      {
        if(email.value){
          return true
      }
        return 'Inserire una email.'
      }
  ]

  let rulePassword=[ () =>
      {
        if(password.value){
          return true
      }
        return 'Inserire una password.'
      }
  ]

  let ruleConfirmPassword=[ () =>
      {
        if(confirmPassword.value){
          return true
      }
        return 'Confermare la password.'
      }
  ]  
  
  let ruleVeicolo=[ () =>
      {
        if(tipoVeicolo.value){
          return true
      }
        return 'Inserire il tipo del veicolo.'
      }
  ]

  let ruleTarga=[ () =>
      {
        if(targa.value){
          return true
      }
        return 'Inserire la targa del veicolo.'
      }
  ]

  let rulePagamento=[ () =>
      {
        if(metodoPagamento.value){
          return true
      }
        return 'Inserire un metodo di pagamento.'
      }
  ]

  let ruleMaggiorenne=[ () =>
      {
        if(isAdult.value){
          return true
      }
        return 'Devi essere maggiorenne.'
      }
  ]
    
  
  </script>
  