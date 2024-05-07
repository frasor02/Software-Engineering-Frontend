<script setup>
import {ref, watch} from 'vue';
import { RouterLink } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';
const drawer = ref(false);
const theme = ref(false);
const realTheme = useTheme();

function changeTheme(){
    theme.value = !theme.value;
    realTheme.global.name.value = theme.value ? "dark" : "light";
}

</script>

<template>
    <v-toolbar border density="comfortable">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" style="text-decoration: none; color: inherit;">
            <v-toolbar-title>
                <span class="font-weight-bold capitalize text-blue-darken-2">Ricerca Parcheggio Efficace</span>
            </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-divider vertical ></v-divider>
        <v-btn icon variant="text" @click="changeTheme" color="blue-darken-2"><v-icon :icon="theme ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon></v-btn>
        <v-divider vertical ></v-divider>
        <v-btn append-icon="mdi-account" variant="text" to="/register" size="x-large" color="blue-darken-2">
        Register
        </v-btn>
        <v-divider vertical ></v-divider>
        <v-btn append-icon="mdi-login" variant="text" to="/login" size="x-large" color="blue-darken-2">
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