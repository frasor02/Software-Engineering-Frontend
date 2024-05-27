<script setup>
import { onMounted, ref } from 'vue';
import { responseFeedback, errorFeedback, fetch_get_feedback} from '../states/feedback.js'
    
const token = ref(null);

onMounted(() => {
        token.value = localStorage.getItem('token');
        if (token.value){
            fetch_get_feedback(token.value);
        }
    });

</script>

<template>
    <div v-if="token" class="Feedback">
        <h1>I miei feedback:</h1>
        <div v-if="errorFeedback">{{ errorFeedback }}</div>
        <div v-else-if="!responseFeedback.value" class="d-flex justify-center ma-10"><v-progress-circular indeterminate></v-progress-circular></div>
        <div v-else class=" justify-center">
            <div v-for="p in responseFeedback.value" :key="p._id" class="d-flex justify-center">
                <v-card variant="outlined" flat class="pa-6 ma-2" >
                    <h3>Rating:</h3>
                    <v-rating readonly
                    v-model="p.rating"
                    active-color="blue"
                    color="orange-lighten-1"
                    ></v-rating>
                    <p>Parcheggio: {{ p.nomeParcheggio }}</p>
                    <p>Da: {{ p.utenteMail }}</p>
                    <p> {{ p.testoFeedback }}</p>
                </v-card>
            </div>
        </div>    
    </div>
    <div v-else>Effettua il login</div>
</template>
