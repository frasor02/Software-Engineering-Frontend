import { ref, reactive } from 'vue'

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const PARK_URL = API_URL+'/parcheggio/';

const park = reactive([]);
const parkid = ref(null);
const parksearch = reactive([])
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

// Funzione che fa il GET ricerca per trovare il posto più vicino ad un parcheggio
async function fetchParkSearch(meta, isCoperto, comboPosti, comboVeicolo){
    let dis, grav, auto, moto, furgone, bus;
    switch(comboPosti){
        case "Disabili":{
            dis = true; grav = false;
            break;
        }
        case "Donne in attesa":{
            dis = false; grav = true;
            break;
        }
        default:{
            dis = false; grav = false;
            break;
        }
    }
    switch(comboVeicolo){
        case "Auto":{
            auto = true; moto= false; furgone=false; bus=false;
            break;
        }
        case "Moto":{
            auto = false; moto= true; furgone=false; bus=false;
            break;
        }
        case "Furgone":{
            auto = false; moto= false; furgone=true; bus=false;
            break;
        }
        case "Bus":{
            auto = false; moto= false; furgone=false; bus=true;
            break;
        }
        default:{
            auto = false; moto= false; furgone=false; bus=false;
            break;
        }
    }
    try{
        console.log(PARK_URL + ":" + meta + "/:" + isCoperto + "/:" + dis + "/:" + grav + "/:" + auto + "/:"+ moto + "/:" + furgone + "/:" + bus)
        let data = await fetch(PARK_URL + ":" + meta + "/:" + isCoperto + "/:" + dis + "/:" + grav + "/:" + auto + "/:"+ moto + "/:" + furgone + "/:" + bus);
        if(!data.ok){
            throw new Error("Data not found");
        }
        parksearch.value = await data.json();
    }catch(err){
        error.value = err.message;
    }
};

export { park,parkid,parksearch, error, fetchPark, fetchParkId,  fetchParkSearch};