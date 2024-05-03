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
    <h1>Parcheggi:</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="!park.value">Loading...</div>
    <div v-else>
      <div v-for="p in park.value" :key="p._id">
          <router-link v-if="p._id !== undefined" :to="{name: 'dettaglipark', params: {parcheggioId: p._id}}" style="text-decoration: none; color: inherit;">
          <h3>{{ p.nome }}</h3>
          </router-link>
      </div>
    </div>

    
  </div>

  
</template>