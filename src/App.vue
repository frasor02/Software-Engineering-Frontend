<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <v-app>
    <Navbar></Navbar>
    <RouterView/>
  </v-app>
</template>