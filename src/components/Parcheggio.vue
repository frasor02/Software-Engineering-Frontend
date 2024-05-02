<script setup>
import { ref, onMounted, watch } from 'vue';
import { park, fetchPark } from '../states/parcheggio.js';

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const PARK_URL = API_URL+'/parcheggio';

// fetch in inizializzazione
onMounted( () => {
  fetchPark();
})

</script>

<template>
<h1>Parcheggi:</h1>
  <ul>
    <li v-for="park in park.value" :key="park.self">
      <a :href="HOST+park.self">{{park.nome}}</a>
    </li>
  </ul>
</template>