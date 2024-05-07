import { ref } from 'vue';
import leaflet from "leaflet";

const map = ref();
const mapSearch = ref();
const startingCoord = [46.06722058076118, 11.122747968511277];
const startingZoom = 13;
const corner1 = [46.036073449255646, 11.097098093783192];
const corner2= [46.17933757653747, 11.171938222971134];
const mapBounds = leaflet.latLngBounds(corner1, corner2);

function mountMap(lat, long){
    map.value = leaflet.map('map',{minZoom:12, maxBounds: mapBounds}).setView([lat, long], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
}

function addMarker(lat, long){
    let marker = new leaflet.Marker(leaflet.latLng(lat, long), {title:"Parcheggio"}).addTo(map.value)
}


export { map,mapSearch,startingCoord, startingZoom,mapBounds, mountMap, addMarker }