<script setup>
    import { onMounted, ref } from 'vue';
    import { responsePrenotazione, errorePrenotazione, scadenzaPrenotazione, scadenzaCancellazione, createPrenotazione } from '../states/prenotazione';

    const props = defineProps(['parcheggioId']); 
    const token = ref(null);
    const tipoPosto = ref("Normale");
    const disabled = ref(false);
    const timeout = ref(null);

    onMounted(() => {
        token.value = localStorage.getItem('token');
        responsePrenotazione.value = null;
    });

    function prenotazione(){
        if (props.parcheggioId && tipoPosto.value && token.value){
            createPrenotazione(props.parcheggioId, tipoPosto.value, token.value);
            if (!errorePrenotazione.value){
                disabled.value = true;
                timeout.value = setTimeout(() => {
                    disabled.value = false;
                }, 3000);
            }
        }
    };
</script>

<template>
    <div class="d-flex justify-center  mb-6">
      <v-card flat>
        <h1 class="d-flex justify-center">Prenotazione</h1>
        <p class="d-flex justify-center">Prenota un parcheggio</p>
        <div class="d-flex justify-center">
            <v-form v-on:submit.prevent="prenotazione">
            <v-combobox :items="['Normale', 'Disabili', 'Gravidanza']" label="Tipo di posto" v-model="tipoPosto"></v-combobox>
            <v-btn :disabled="disabled" type="submit" svariant="outlined"> Conferma prenotazione</v-btn>
            </v-form> 
        </div>
        <div class="d-flex justify-center  ma-6">
            <div v-if="errorePrenotazione"> {{errorePrenotazione}} </div>
            <div v-else-if="!responsePrenotazione"> Compila i campi </div>
            <div v-else> 
                <v-card flat>
                    <v-card-title>Prenotazione avvenuta con successo:</v-card-title>
                    <v-card-item>Posto: {{ responsePrenotazione.createdPrenotazione.tipoPosto }}</v-card-item> 
                    <v-card-item>Veicolo: {{ responsePrenotazione.createdPrenotazione.veicolo.tipoVeicolo }}</v-card-item>
                    <v-card-item>Targa: {{ responsePrenotazione.createdPrenotazione.veicolo.targa }}</v-card-item>
                    <v-card-item>La prenotazione è valida fino alle {{ scadenzaPrenotazione.toString().split(' ')[4] }}</v-card-item>
                    <v-card-item>La prenotazione può essere cancellata fino alle {{ scadenzaCancellazione.toString().split(' ')[4] }}</v-card-item>
                </v-card>
            </div>
        </div>
      </v-card>
    </div>
</template>