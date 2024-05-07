<script setup>
import {onMounted, ref, onUpdated} from 'vue';
import { parkid, errorid, fetchParkId } from '../states/parcheggio.js';
import Map from './Map.vue';
const props = defineProps(['parcheggioId'])

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

onUpdated(()=>{
        forceRerender();
})

onMounted(() => {
    fetchParkId(props.parcheggioId);
})
</script>

<template>
    <div v-if="errorid">{{ errorid }}</div>
    <div v-else-if="!parkid"><v-progress-circular indeterminate></v-progress-circular></div>
    <div v-else class="d-flex justify-center  mb-6">
        <v-list lines="one">
            <v-list-item>
                <h1>{{parkid.res.nome}}</h1>
                <div  v-if="parkid.res._type === 'ParcheggioFree'">
                    <v-chip variant="outlined">
                    Parcheggio gratuito
                    </v-chip>
                    <div v-if="parkid.res.isDisco"> 
                        <span> Disco orario dalle {{ parkid.res.dataInizio}}-{{parkid.res.dataFine}}.</span>   
                    </div>
                    <div v-else>
                        Senza disco orario.
                    </div>
                </div>
                <v-chip variant="outlined" v-else-if="parkid.res._type === 'ParcheggioPay'">
                Parcheggio a pagamento
                </v-chip>
                <v-chip variant="outlined" v-else>
                Parcheggio vigilato
                </v-chip>
                <div><span v-if="parkid.res.tariffa">Tariffa: {{parkid.res.tariffa}}€/ora</span></div>
                <div><span>Numero di posti: {{parkid.res.numPosti}} di cui:</span></div>
                <div><span>Posti disabili: {{parkid.res.numPostiDisabili}}</span></div>
                <div><span>Posti gravidanza: {{parkid.res.numPostiGravidanza}}</span></div>
                <div><span>Posti auto: {{parkid.res.numPostiAuto}}</span></div>
                <div><span>Posti moto: {{parkid.res.numPostiMoto}}</span></div>
                <div><span>Posti furgone: {{parkid.res.numPostiFurgone}}</span></div>
                <div><span>Posti bus: {{parkid.res.numPostiBus}}</span></div>
                <div><span v-if="parkid.res.isCoperto">Parcheggio coperto</span>
                <span v-else>Parcheggio non coperto</span></div>
                <div><span>Stato del parcheggio: {{parkid.res.statoParcheggio}}</span></div>
                <div v-if="parkid.res._type === 'ParcheggioVigilato'">
                    <v-btn variant="outlined">Prenota un posto</v-btn>
                </div>
                <div><h3>Posizione:</h3></div>
                <div><Map :lat="parkid.res.posizione.coordinates[0]" :long="parkid.res.posizione.coordinates[1]" :key="componentKey" /></div>
            </v-list-item>
        </v-list>
        
        
        
    </div>
</template>