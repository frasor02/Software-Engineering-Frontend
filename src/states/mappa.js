import { ref } from 'vue';
import leaflet from "leaflet";


const map = ref();
const mapSearch = ref();
const markers = ref([])

function mountMap(lat, long){
    map.value = leaflet.map('map').setView([lat, long], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
}

function addMarker(lat, long){
    let marker = new leaflet.Marker(leaflet.latLng(lat, long)).addTo(map.value)
}

function onMapSearchClick(e){
    if(markers.value.length > 0){
        let marker = markers.value.pop();
        console.log(marker);
        mapSearch.value.removeLayer(marker);
    }
        let marker = new leaflet.Marker(e.latlng).addTo(mapSearch.value);
        markers.value.push(marker);

}

function mountMapSearch(lat, long){
    mapSearch.value = leaflet.map('mapSearch').setView([lat, long], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapSearch.value);
    mapSearch.value.on('click', onMapSearchClick);
}

export { map,mapSearch, mountMap, addMarker,mountMapSearch }