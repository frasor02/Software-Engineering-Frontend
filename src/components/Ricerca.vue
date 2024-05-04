<script setup>
import {ref} from 'vue'

const meta = ref(null)
const isCoperto = ref(false);
const comboPosti = ref(null);
const comboVeicolo = ref(null);


function ricerca(){
    console.log(meta)
    console.log(isCoperto.value)
    console.log( comboPosti.value)
    console.log( comboVeicolo.value);
}
</script>


<template>
    <v-card title="Ricerca parcheggio" text="Le seguenti opzioni consentono di cercare un parcheggio che rispetta le tue esigenze!">
        <v-form>
            <v-text-field
            v-model="meta"
            label="Meta desiderata (in coordinate)"
            required
          ></v-text-field>
        </v-form>
        <v-checkbox v-model="isCoperto ":label="'Coperto:'"></v-checkbox>
        <v-combobox v-model="comboPosti"
        label="Posti"
        :items="['Disabili', 'Donne in gravidanza']" clearable
        ></v-combobox>
        <v-combobox v-model="comboVeicolo"
        label="Tipologia Veicolo"
        :items="['Auto', 'Moto', 'Furgone', 'Bus']" clearable
        ></v-combobox>
        <v-btn variant="outlined" color="blue-darken-3" @click="ricerca">Cerca</v-btn>
    </v-card>
</template>