import { ref, reactive } from 'vue'
import { parkid, errorid, fetchParkId } from '../states/parcheggio';

const API_URL = 'http://localhost:3000';
const PRENOTAZIONE_URL = API_URL+'/v1/prenotazione/';

const responsePrenotazione = ref(null);
const errorePrenotazione = ref(null);
const scadenzaPrenotazione = ref(null);
const scadenzaCancellazione = ref(null);

const resFetch = reactive([]);
const errFetch = ref(null);

const resDelete = ref(null);
const errDelete = ref(null);

/**
 * Funzione che fa la POST della prenotazione di un posto in un parcheggio vigilato.
 * L'utente deve essere autenticato.
 * @param {Object} parcheggioId ID del parcheggio in cui si vuole effettuare la prenotazione.
 * @param {String} tipoPosto Tipo di posto scelto per la prenotazione.
 * @param {String} token jwt creato dopo l'autenticazione e salvato nel localStorage.
 */
async function createPrenotazione(parcheggioId, tipoPosto, token){
    try {
        errorePrenotazione.value = null;
        responsePrenotazione.value = null;
        if (typeof(tipoPosto) != 'string'){
            throw new Error('Tipo posto inesistente')
        }
        tipoPosto = tipoPosto.toLowerCase();
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                parcheggioId: parcheggioId, 
                tipoPosto: tipoPosto 
            }) 
        };

        const response = await fetch(PRENOTAZIONE_URL, requestOptions);
        if (!response.ok){
            throw new Error('Prenotazione fallita');
        }
        responsePrenotazione.value = await response.json();

        // Inizializzazione variabili scadenza
        scadenzaPrenotazione.value = new Date(responsePrenotazione.value.createdPrenotazione.dataPrenotazione);
        scadenzaPrenotazione.value.setTime(scadenzaPrenotazione.value.getTime() + 60*60*1000);
        scadenzaCancellazione.value = new Date(responsePrenotazione.value.createdPrenotazione.dataPrenotazione);
        scadenzaCancellazione.value.setTime(scadenzaCancellazione.value.getTime() + 30*60*1000);
    } catch(err) {
        errorePrenotazione.value = err.message;
    }
};

/**
 * Funzione che fa la GET delle prenotazioni di un utente.
 * L'utente deve essere autenticato.
 * @param {String} token jwt creato dopo l'autenticazione e salvato nel localStorage.
 */
async function fetchPrenotazioni(token){
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    };
    try {
        let response = await fetch(PRENOTAZIONE_URL, requestOptions);
        if (!response.ok){
            throw new Error('Fetch fallita');
        }
        response = await response.json();
        resFetch.value = response.prenotazioni;
    } catch(err) {
        errFetch.value = err.message;
    }
    for (let p of resFetch.value){ //????????
        try {
            await fetchParkId(p.parcheggioId);
            p.nomeParcheggio = parkid.value.res.nome;
        } catch(err) {
            p.nomeParcheggio = "Not found";
        }
    }
};

/**
 * Funzione che fa la DELETE di una prenotazione dato prenotazioneId. 
 * L'utente deve essere autenticato.
 * @param {Object} prenotazioneId ID della prenotazione da cancellare.
 * @param {String} token jwt creato dopo l'autenticazione e salvato nel localStorage.
 */
async function deletePrenotazione(prenotazioneId, token){
    const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            prenotazioneId: prenotazioneId
        })
    };
    try {
        errDelete.value = null;
        const response = await fetch(PRENOTAZIONE_URL + ':' + prenotazioneId, requestOptions);
        if (!response.ok){
            throw new Error('Delete fallita');
        }
        resDelete.value = await response.json();
        console.log(resDelete)
    } catch(err) {
        errDelete.value = err.message;
    }
};

export {responsePrenotazione, errorePrenotazione, scadenzaPrenotazione, scadenzaCancellazione, resFetch, errFetch, resDelete, errDelete, createPrenotazione, fetchPrenotazioni, deletePrenotazione};