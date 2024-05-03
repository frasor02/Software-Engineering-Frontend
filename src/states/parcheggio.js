import { ref, reactive } from 'vue'

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const PARK_URL = API_URL+'/parcheggio/';

const park = reactive([]);
const error = ref(null);

// Funzione che fa il fetch della GET su /parcheggio/ nel backend
async function fetchPark(){
    park.value = await (await fetch(PARK_URL)).json();
    try{
        let data = await fetch(PARK_URL);
        if(!data.ok){
            throw new Error("Data not found");
        }
        data = await data.json();
        park.value = data.parcheggi;
        console.log(park.value)
    }catch(err){
        error.value = err.message;
    }
};

export { park,error, fetchPark };