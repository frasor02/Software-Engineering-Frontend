import { ref, reactive } from 'vue'

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const REGISTRAZIONE_URL = API_URL+'/v1/utente/';
const TOKEN_URL = API_URL+'/v1/token/';

const response_registrazione = reactive({});
const errore = ref(null);

// Funzione che fa il fetch della POST su /utente/ nel backend
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

export { response_registrazione, errore, fetchRegistrazione};