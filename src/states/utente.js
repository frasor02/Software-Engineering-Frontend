import { ref, reactive } from 'vue'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`;
const API_URL = HOST + '/v1';
const REGISTRAZIONE_URL = API_URL+'/utente/';
const TOKEN_URL = API_URL+'/token/';

// Variabili delle risposte alle fetch, successivamente mostrate sulla pagina web.
const response_registrazione = reactive({});
const errore = ref(null);
const response_login = reactive({});
const errore_login = ref(null);

/** Funzione che fa il fetch della POST su /utente/ nel backend
 * Non sono stati implementati dei controlli sulle stringhe date in input data la bassa priorità.
 * Essendo il frontend diretto solo all'utente base non è possibile registrare un profilo admin.
* @param {string} email email con cui l'utente vuole registrarsi
* @param {string} password password con cui l'utente vuole registrarsi
* @param {string} metodoPagamento metodo di pagamento dell'utente, placeholder per potenziale integrazione con sistemi di pagamento
* @param {string} tipoVeicolo tipologia di veicolo utilizzata per prenotare un posto e per il pagamento
* @param {string} targa stringa della targa del veicolo da registrare.   
*/
async function fetchRegistrazione(email, password, metodoPagamento, tipoVeicolo, targa){
    console.log(email, password, metodoPagamento, tipoVeicolo, targa);
   let utente={
    _type: 'UtenteNormale',
    email: email,
    password: password,
    metPagamento: metodoPagamento,
    veicoli: [{tipoVeicolo: tipoVeicolo, targa: targa}]
   }
   try{
    let response = await fetch(REGISTRAZIONE_URL, {
        method:"POST",
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(utente)
    });
    if(!response.ok){
        throw new Error("Registrazione fallita");
    }
    response_registrazione.value = await response.json();
    }catch(err){
        errore.value = err.message;
    }
};

/** Funzione che fa il fetch della POST su /token/ nel backend
 * Il token ottenuto viene salvato nel LocalStorage per poi essere utilizzato in successive chiamate al backend.
 * Questa scelta è solo a scopo dimostrativo delle funzionalità frontend per l'utente poiché non garantisce la sicurezza del token.
* @param {string} email email con cui l'utente vuole registrarsi
* @param {string} password password con cui l'utente vuole registrarsi
*/
async function fetchLogin(email, password){
    errore_login.value = null;
   let richiesta={
    email: email,
    password: password
   }
   try{
    let response = await fetch(TOKEN_URL, {
        method:"POST",
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(richiesta)
    });
    if(!response.ok){
        throw new Error("Login fallita");
    }
    response_login.value = await response.json();
    localStorage.setItem('token', response_login.value.token);
    window.location.reload();
    }catch(err){
        errore_login.value = err.message;
    }
};

export { response_registrazione, response_login, errore, errore_login, fetchRegistrazione, fetchLogin};