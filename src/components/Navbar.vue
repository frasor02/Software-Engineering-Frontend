<script setup>
import {ref, watch} from 'vue';
import { RouterLink } from 'vue-router';
const drawer = ref(false);
const items = [
    {icon: 'mdi-magnify', text: 'Ricerca parcheggio', route: '/parcheggio/ricerca'},
    {icon: 'mdi-parking', text: 'Vedi i parcheggi', route: '/parcheggio/'},
    {icon: 'mdi-parking', text: 'Conosci il progetto', route: '/about/'}
]

</script>

<template>
    <v-toolbar border density="comfortable">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" style="text-decoration: none; color: inherit;">
            <v-toolbar-title>
                <span class="font-weight-bold capitalize text-blue-darken-3">Ricerca Parcheggio Efficace</span>
            </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-divider vertical ></v-divider>
        <v-btn append-icon="mdi-account" variant="text" to="/register" size="x-large" color="blue-darken-3">
        Register
        </v-btn>
        <v-divider vertical ></v-divider>
        <v-btn append-icon="mdi-login" variant="text" to="/login" size="x-large" color="blue-darken-3">
        Log-in
        </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app temporary  class="bg-blue-lighten-5">
        <v-list>
            <v-list-item prepend-icon='mdi-magnify' title='Ricerca parcheggio' to="/parcheggio/ricerca"></v-list-item>
            <v-list-item prepend-icon='mdi-parking' title='Vedi i parcheggi' to="/parcheggio/"></v-list-item>
            <v-list-item prepend-icon='mdi-account-group' title='Conosci il progetto' to="/about/"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    
</template>