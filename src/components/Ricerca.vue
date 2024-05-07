<script setup>
import { ref} from 'vue'
import {parksearch, errorsearch, fetchParkSearch} from '../states/parcheggio'
import MapSearch from './MapSearch.vue'

const lat = ref(null)
const long = ref(null)
const notMeta = ref(null)
const isCoperto = ref(false);
const comboPosti = ref(null);
const comboVeicolo = ref(null);


function onMapClick(value){
    lat.value = value.lat;
    long.value= value.lng;
}

function ricerca(){
    if(!(lat.value && long.value)){
        notMeta.value = true;
    }else{
        notMeta.value = false;
        fetchParkSearch(lat.value, long.value, isCoperto.value, comboPosti.value, comboVeicolo.value);
    }
}
</script>


<template>
    <v-card variant="text" title="Ricerca Parcheggio" text="Le seguenti opzioni consentono di cercare un parcheggio che rispetta le tue esigenze!">
        <v-form  v-on:submit.prevent="ricerca">
            <div v-if="notMeta">Inserire una meta!</div>
            <map-search @clicked="onMapClick"></map-search>
            <v-checkbox v-model="isCoperto ":label="'Coperto:'"></v-checkbox>
            <v-combobox v-model="comboPosti"
            label="Posti"
            :items="['Disabili', 'Donne in attesa']" clearable
            ></v-combobox>
            <v-combobox v-model="comboVeicolo"
            label="Tipologia Veicolo"
            :items="['Auto', 'Moto', 'Furgone', 'Bus']" clearable
            ></v-combobox>
            <v-btn type="submit" variant="outlined" color="blue-darken-3">Cerca</v-btn>
        </v-form>
    </v-card>
    <div class="d-flex justify-right  mb-6">
        <div v-if="errorsearch">{{ errorsearch }}</div>
        <div v-else-if="!parksearch.value"></div>
        <div v-else>{{parksearch}}</div>
    </div>
</template>