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
  <p>{{park.value.parcheggi}}</p>
</template>