<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <v-app class="bg-grey-lighten-5">
    <v-content>
      <Navbar></Navbar>
      <RouterView/>
    </v-content>
  </v-app>
</template>