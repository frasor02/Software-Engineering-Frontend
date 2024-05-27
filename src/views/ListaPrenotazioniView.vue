<script setup>
    import { onMounted, onUpdated, ref, computed } from 'vue';
    import { resFetch, errFetch, resDelete, errDelete, fetchPrenotazioni, deletePrenotazione } from '../states/prenotazione';
    import router from '../router';

    const componentKey = ref(0);

    const token = ref(null);
    const lastDeleteId = ref(null);

    onUpdated(() => {
        ++componentKey.value;
    });

    onMounted(() => {
        token.value = localStorage.getItem('token');
        if (token.value){
            fetchPrenotazioni(token.value);
        }
    });

    /**
     * Funzione che controlla se è possibile cancellare la prenotazione
     * @param data data in cui è stata effettuata la prenotazione
     */
    function canDelete(data){
        return (new Date().getTime()) - new Date(data).getTime() < 30*60*1000;
    }

    /**
     * Funziona wrapper della funzione deletePrenotazione che ricorda 
     * l'ID della prenotazione cancellata per mostrare l'errore.
     * @param prenotazioneId ID della prenotazione da cancellare.
     */
    async function delPrenotazione(prenotazioneId){
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
                            <h3>Prenotazione: {{ new Date(p.dataPrenotazione).toString().split('GMT')[0] }}</h3>
                            <v-card-item>Parcheggio: {{ p.nomeParcheggio }}</v-card-item>
                            <v-card-item>Tipo posto: {{ p.tipoPosto }}</v-card-item>
                            <v-card-item>Veicolo: {{ p.veicolo.tipoVeicolo + ', ' + p.veicolo.targa }}</v-card-item>
                            <v-card-item>Scadenza prenotazione: {{ new Date(new Date(p.dataPrenotazione).getTime() + 60*60*1000).toTimeString().split(' ')[0] }}</v-card-item>
                            <v-card-item>Scadenza cancellazione: {{ new Date(new Date(p.dataPrenotazione).getTime() + 30*60*1000).toTimeString().split(' ')[0] }}</v-card-item>
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
                            <div v-if="canDelete(p.dataPrenotazione)">
                                <v-btn :color="isHovering ? 'red' : undefined" v-bind="props" icon @click="delPrenotazione(p._id)">
                                    <v-icon color="red-lighten-1">mdi-trash-can-outline</v-icon>
                                </v-btn>
                                <v-card-text v-if="errDelete && p._id == lastDeleteId">{{ errDelete }}</v-card-text>
                            </div>
                            <div v-else>
                                <v-btn :color="isHovering ? 'red' : undefined" v-bind="props" disabled icon @click="delPrenotazione(p._id)">
                                    <v-icon color="red-lighten-1">mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-hover>
                </v-card>
            </div>
        </div> 
    </div>
    <div v-else>Effettua il login</div>
</template>