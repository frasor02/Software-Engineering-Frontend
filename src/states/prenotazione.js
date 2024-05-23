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

// Funzione che fa la POST della prenotazione di un posto in un parcheggio vigilato
async function createPrenotazione(parcheggioId, tipoPosto, token){
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
    try {
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

// Funzione che fa la GET delle prenotazioni di un utente
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

export {responsePrenotazione, errorePrenotazione, scadenzaPrenotazione, scadenzaCancellazione, resFetch, errFetch, createPrenotazione, fetchPrenotazioni};