<script setup>
import {ref} from 'vue'

const isCoperto = ref(false);


function ricerca(){
    console.log(isCoperto.value);
}
</script>


<template>
    Ricerca parcheggio

    <v-checkbox v-model="isCoperto ":label="'Coperto:'"></v-checkbox>
    <v-checkbox :label="`Posti per disabili:`"></v-checkbox>
    <v-checkbox :label="`Posti per donne in gravidanza:`"></v-checkbox>
    <v-checkbox :label="`Posti auto:`"></v-checkbox>
    <v-checkbox :label="`Posti moto:`"></v-checkbox>
    <v-checkbox :label="`Posti furgone:`"></v-checkbox>
    <v-checkbox :label="`Posti bus:`"></v-checkbox>
    <v-btn variant="outlined" color="blue-darken-3" @click="ricerca">Cerca</v-btn>
</template>