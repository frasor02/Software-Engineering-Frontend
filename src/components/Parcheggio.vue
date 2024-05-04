<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router'
import { park, error, fetchPark } from '../states/parcheggio.js';

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const PARK_URL = API_URL+'/parcheggio/';

// fetch in inizializzazione
onMounted( () => {
  fetchPark();
})

</script>

<template>
  <div class="Parcheggio">
    <div v-if="error">{{ error }}</div>
    <div v-if="!park.value"><v-progress-circular indeterminate></v-progress-circular></div>
    <div v-else>
      <div v-for="p in park.value" :key="p._id" class="d-flex justify-center  mb-6">
          <router-link v-if="p._id !== undefined" :to="{name: 'dettaglipark', params: {parcheggioId: p._id}}" style="text-decoration: none; color: inherit;">
          <v-card class="pa-6">
            <h3>Nome Parcheggio: {{ p.nome }}</h3>
            <p v-if="p._type === 'ParcheggioFree'">Tipo Parcheggio: Parcheggio Gratuito</p>
            <p v-else-if="p._type === 'ParcheggioPay'">Tipo Parcheggio: Parcheggio a pagamento</p>
            <p v-else>Tipo Parcheggio: Parcheggio vigilato</p>
            <v-card-actions>
              <v-icon v-if="p._type === 'ParcheggioFree'">mdi-parking</v-icon>
              <v-icon v-else-if="p._type === 'ParcheggioPay'">mdi-credit-card-outline</v-icon>
              <v-icon v-else="p._type === 'ParcheggioVigilato'">mdi-account-lock</v-icon>
            </v-card-actions>
          </v-card>
          <v-divider></v-divider>  
          </router-link>
      </div>
    </div>

    
  </div>

  
</template>