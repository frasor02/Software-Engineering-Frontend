import { ref } from 'vue'

const API_URL = 'http://localhost:3000';
const PRENOTAZIONE_URL = API_URL+'/v1/prenotazione/';

const responsePrenotazione = ref(null);
const errore = ref(null);
const scadenzaPrenotazione = ref(null);
const scadenzaCancellazione = ref(null);

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
        errore.value = err.message;
    }
};

export {responsePrenotazione, errore, scadenzaPrenotazione, scadenzaCancellazione, createPrenotazione};