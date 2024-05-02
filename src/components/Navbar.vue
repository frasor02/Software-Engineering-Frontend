<script>
import { RouterLink } from 'vue-router'
</script>

<template>
    <v-toolbar border density="comfortable">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <router-link to="/" style="text-decoration: none; color: inherit;">
            <v-toolbar-title>
                <span class="font-weight-bold capitalize">Ricerca Parcheggio Efficace</span>
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
</template>