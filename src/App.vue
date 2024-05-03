<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <v-app class="bg-grey-lighten-5">
    <Navbar></Navbar>
    <RouterView/>
  </v-app>
</template>