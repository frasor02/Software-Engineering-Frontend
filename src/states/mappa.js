import { ref } from 'vue';
import leaflet from "leaflet";


const map = ref();

function mountMap(lat, long){
    map.value = leaflet.map('map').setView([lat, long], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
}

export { map, mountMap }