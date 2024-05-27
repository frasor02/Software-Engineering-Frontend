<template>
    <div class="d-flex justify-center ">
      <v-card flat>
        <h1 class="d-flex justify-center">Feedback</h1>
        <p class="d-flex justify-center">Lascia la tua opinione!</p>
            <v-form v-on:submit.prevent="feedback">
            <div><v-rating
                v-model="rating"
                active-color="blue"
                color="orange-lighten-1"
            ></v-rating></div>
            <v-textarea
                v-model="testoFeedback"
                :rules="rules"
                label="Recensione"
                counter
            ></v-textarea>
            <v-btn :disabled="disabled" type="submit" svariant="outlined"> Invio feedback </v-btn>
            </v-form> 
        <div class="d-flex justify-center  ma-6">
            <div v-if="errorPostFeedback"> {{errorPostFeedback}} </div>
            <div v-else-if="!responsePostFeedback.value"> Compila i campi </div>
            <div v-else> 
                <v-card flat>
                    <v-card-title>Feedback inviato con successo!</v-card-title>
                </v-card>
            </div>
        </div>
      </v-card>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {responsePostFeedback, errorPostFeedback, fetch_post_feedback} from '../states/feedback.js'

const props = defineProps(['parcheggioId']); 
const token = ref(null);
const disabled = ref(false);
const timeout = ref(null);
const rating = ref(0);
const testoFeedback = ref("");


onMounted(() => {
    token.value = localStorage.getItem('token');
    responsePostFeedback.value = null;
});

let rules=[ () =>
      {
        if(testoFeedback.value && testoFeedback.value.length > 300){
          return true
      }
        return 'Inserire una testo valido entro 300 caratteri.'
      }
  ]

function feedback(){
    console.log(rating.value)
    if (props.parcheggioId && token.value && testoFeedback.value && testoFeedback.value != "" && testoFeedback.value.length <= 300){
            fetch_post_feedback(props.parcheggioId, rating.value,testoFeedback.value, token.value);
            if (!errorPostFeedback.value){
                disabled.value = true;
                timeout.value = setTimeout(() => {
                    disabled.value = false;
                }, 3000);
            }
        }
}
  
</script>