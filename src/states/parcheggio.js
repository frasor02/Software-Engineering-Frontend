import { ref, reactive } from 'vue'

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const PARK_URL = API_URL+'/parcheggio/';

const park = reactive([]);
const parkid = ref(null);
const error = ref(null);

// Funzione che fa il fetch della GET su /parcheggio/ nel backend
async function fetchPark(){
    try{
        let data = await fetch(PARK_URL);
        if(!data.ok){
            throw new Error("Data not found");
        }
        data = await data.json();
        park.value = data.parcheggi;
    }catch(err){
        error.value = err.message;
    }
};

// Funzione che fa il GET id su parcheggio/parcheggioId nel backend
async function fetchParkId(parcheggioId){
    try{
        let data = await fetch(PARK_URL + ":" + parcheggioId);
        if(!data.ok){
            throw new Error("Data not found");
        }
        parkid.value = await data.json();
    }catch(err){
        error.value = err.message;
    }
};

export { park,parkid, error, fetchPark, fetchParkId };