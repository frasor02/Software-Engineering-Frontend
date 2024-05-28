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
    <v-sheet class="d-flex flex-wrap justify-left">
    <v-sheet class=" ma-2 pa-2 ">
        <v-card  variant="text">
            <div><h3>Ricerca parcheggio</h3></div>
            <div><p>Le seguenti opzioni consentono di cercare un parcheggio che rispetta le tue esigenze!</p></div>
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
    </v-sheet>

    <v-sheet class=" ma-2 pa-2 ">
        <div v-if="errorsearch">{{ errorsearch }}</div>
        <div v-else-if="!parksearch.value"></div>
        <div v-else>
            <h3>Parcheggi Trovati:</h3>
            <div v-for="p in parksearch.value.parcheggi" :key="p._id">
                <router-link v-if="p._id !== undefined" :to="{name: 'dettaglipark', params: {parcheggioId: p._id}}" style="text-decoration: none; color: inherit;">
                <v-card class="pa-6">
                <h3>Nome Parcheggio: {{ p.nome }}</h3>
                <p v-if="p._type === 'ParcheggioFree'">Tipo Parcheggio: Parcheggio Gratuito</p>
                <p v-else-if="p._type === 'ParcheggioPay'">Tipo Parcheggio: Parcheggio a pagamento</p>
                <p v-else>Tipo Parcheggio: Parcheggio vigilato</p>
                <v-card-actions>
                    <v-icon v-if="p._type === 'ParcheggioFree'">mdi-parking</v-icon>
                    <v-icon v-else-if="p._type === 'ParcheggioPay'">mdi-credit-card-outline</v-icon>
                    <v-icon v-else="p._type === 'ParcheggioVigilato'">mdi-account-lock</v-icon>
                </v-card-actions>
                </v-card>
                </router-link>
            </div>
        </div>
    </v-sheet>
    </v-sheet>
</template>