<script setup>
import {ref} from 'vue'
import {parksearch, error, fetchParkSearch} from '../states/parcheggio'

const meta = ref(null)
const isCoperto = ref(false);
const comboPosti = ref(null);
const comboVeicolo = ref(null);

let rules = [ () => { 
    if(meta.value){
        return true;
    }
    return "Devi inserire una meta"
}];

function ricerca(){
    if(!meta.value){
    }else{
        fetchParkSearch(meta.value, isCoperto.value, comboPosti.value, comboVeicolo.value);
    }
}
</script>


<template>
    <v-card variant="text" title="Ricerca Parcheggio" text="Le seguenti opzioni consentono di cercare un parcheggio che rispetta le tue esigenze!">
        <v-form  v-on:submit.prevent="ricerca">
            <v-text-field
            v-model="meta"
            label="Meta desiderata (in coordinate)"
            :rules="rules"
            required
            ></v-text-field>
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
        <div v-if="error">{{ error }}</div>
        <div v-else-if="!parksearch.value"></div>
        <div v-else>{{parksearch}}</div>
    </div>
</template>