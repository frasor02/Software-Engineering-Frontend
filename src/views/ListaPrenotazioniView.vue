<script setup>
    import { onMounted, onUpdated, ref } from 'vue';
    import { resFetch, errFetch, resDelete, errDelete, fetchPrenotazioni, deletePrenotazione } from '../states/prenotazione';
    import router from '../router';

    const componentKey = ref(0);

    const token = ref(null);
    const lastDeleteId = ref(null);
// SISTEMARE DATE
    onUpdated(() => {
        ++componentKey.value;
    });

    onMounted(() => {
        token.value = localStorage.getItem('token');
        if (token.value){
            fetchPrenotazioni(token.value);
        }
    });

    async function delPrenotazione(prenotazioneId){
        console.log(errDelete)
        console.log(prenotazioneId)
        lastDeleteId.value = prenotazioneId;
        await deletePrenotazione(prenotazioneId, token.value);
        if (!errDelete.value){
            router.go(0);
        }
    }
</script>

<template>
    <div v-if="token" class="Prenotazioni">
        <div v-if="errFetch">{{ errFetch }}</div>
        <div v-else-if="!resFetch.value" class="d-flex justify-center ma-10"><v-progress-circular indeterminate></v-progress-circular></div>
        <div v-else>
            <div v-for="p in resFetch.value" :key="p._id" class="d-flex justify-center mb-6 mt-6">
                <router-link v-if="p._id !== undefined" :to="{name: 'dettaglipark', params: {parcheggioId: p.parcheggioId}}" style="text-decoration: none; color: inherit;">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card :color="isHovering ? 'grey-lighten-3' : undefined" v-bind="props" class="pa-6">
                            <h3>Prenotazione: {{ Date(p.dataPrenotazione).toString().split('GMT')[0] }}</h3>
                            <v-card-item>Parcheggio: {{ p.nomeParcheggio }}</v-card-item>
                            <v-card-item>Tipo posto: {{ p.tipoPosto }}</v-card-item>
                            <v-card-item>Veicolo: {{ p.veicolo.tipoVeicolo + ', ' + p.veicolo.targa }}</v-card-item>
                            <v-card-actions>
                                <v-icon v-if="p.tipoPosto === 'normale'">mdi-parking</v-icon>
                                <v-icon v-else-if="p.tipoPosto === 'disabili'" color="blue">mdi-wheelchair</v-icon>
                                <v-icon v-else="p.tipoPosto === 'gravidanza'" color="pink-lighten-1">mdi-human-pregnant</v-icon>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                    <v-divider></v-divider>  
                </router-link>
                <v-card class="align-self-center ml-1">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card-actions>
                            <v-btn :color="isHovering ? 'red' : undefined" v-bind="props" icon @click="delPrenotazione(p._id)">
                                <v-icon color="red-lighten-1">mdi-trash-can-outline</v-icon>
                            </v-btn>
                            <v-card-text v-if="errDelete && p._id == lastDeleteId">{{ errDelete }}</v-card-text>
                        </v-card-actions>
                    </v-hover>
                </v-card>
            </div>
        </div> 
    </div>
    <div v-else>Effettua il login</div>
</template>