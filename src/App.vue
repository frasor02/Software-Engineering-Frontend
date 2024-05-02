<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <v-app>
    <v-content>
      <Navbar></Navbar>
      <RouterView/>
    </v-content>
  </v-app>
</template>