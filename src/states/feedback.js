import { ref, reactive } from 'vue'
import { parkid, errorid, fetchParkId } from '../states/parcheggio';


const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`;
const API_URL = HOST + '/v1';
const FEED_URL = API_URL+'/feedback/';
const FEED_PARK_URL = API_URL + '/parcheggio/';

// Inizializzazione variabili per le GET
const responseFeedbackPark = reactive([]);
const errorFeedbackPark = ref(null);
const responseFeedback = reactive([]);
const errorFeedback = ref(null);

// Inizializzazione variabili per la POST
const responsePostFeedback = reactive({});
const errorPostFeedback = ref(null);


/**
 * Funzione che fa la GET dei feedback di un utente.
 * L'utente deve essere autenticato.
 * @param {String} token jwt creato dopo l'autenticazione e salvato nel localStorage.
 */
async function fetch_get_feedback(token){
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    };
    try {
        let response = await fetch(FEED_URL, requestOptions);
        if (!response.ok){
            let err = await response.json();
            throw new Error(err.error);
        }
        response = await response.json();
        responseFeedback.value = response.feedback;
    } catch(err) {
        if(err.message === "jwt expired"){
            localStorage.removeItem("token"); 
            window.location.reload();
            errorFeedback.value = "Effettuare login";
        }else{
            errorFeedback.value = err.message;
        }
    };
    for (let p of responseFeedback.value){
        try {
            await fetchParkId(p.parcheggioId);
            p.nomeParcheggio = parkid.value.res.nome;
        } catch(err) {
            p.nomeParcheggio = "Not found";
        }
    }
};

/**
 * Funzione che fa la GET dei feedback di un parcheggio.
 * L'utente deve essere autenticato.
 * @param {String} token jwt creato dopo l'autenticazione e salvato nel localStorage.
 * @param {String} parkid id del parcheggio di cui si cercano i feedback
 */
async function fetch_get_feedback_park(parkid){
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
    };
    try {
        let response = await fetch(FEED_PARK_URL + ':' + parkid + '/feedback', requestOptions);
        if (!response.ok){
            let err = await response.json();
            throw new Error(err.error);
        }
        response = await response.json();
        responseFeedbackPark.value = response.feedback;
    } catch(err) {
        if(err.message === "jwt expired"){
            localStorage.removeItem("token"); 
            window.location.reload();
            errorFeedbackPark.value = "Effettuare login";
        }else{
            errorFeedbackPark.value = err.message;
        }
    };
};

/**
 * Funzione che fa la POST del feedback di un posto in un parcheggio.
 * L'utente deve essere autenticato.
 * @param {Object} parcheggioId ID del parcheggio in cui si vuole effettuare la prenotazione.
 * @param {String} token jwt creato dopo l'autenticazione e salvato nel localStorage.
 * @param {int} rating numero da 0 a 5 che indica il rating dato dall'utente al parcheggio
 * @param {String} testoFeedback stringa che presenta il feedback lunga al massimo 300 caratteri. 
 */
async function fetch_post_feedback(parcheggioId, rating, testoFeedback, token){
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            parcheggioId: parcheggioId, 
            rating: rating,
            testoFeedback: testoFeedback
        }) 
    };
    try{
        const response = await fetch(FEED_URL, requestOptions);
        if (!response.ok){
            let err = await response.json();
            throw new Error(err.error);
        }
        responsePostFeedback.value = await response.json();
    }catch(err){
        if(err.message === "jwt expired"){
            localStorage.removeItem("token"); 
            window.location.reload();
            errorPostFeedback.value = "Effettuare login";
        }else{
            errorPostFeedback.value = err.message;
        }
    }
};

export {responseFeedbackPark, errorFeedbackPark, responseFeedback, errorFeedback, responsePostFeedback, errorPostFeedback, fetch_get_feedback, fetch_get_feedback_park, fetch_post_feedback};