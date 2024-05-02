import { reactive } from 'vue'

const HOST = 'http://localhost:5173';
const API_URL = 'http://localhost:3000';
const PARK_URL = API_URL+'/parcheggio/';

const park = reactive([]);

async function fetchPark(){
    park.value = await (await fetch(PARK_URL)).json();
};

export { park, fetchPark };