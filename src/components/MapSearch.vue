<template>
    <div id="mapSearch" style="width: 400px;height: 400px"></div>
</template>

<script setup>
import {onMounted,ref } from 'vue';
import {mapSearch, startingCoord, startingZoom, mapBounds} from "@/states/mappa.js"
import leaflet from "leaflet";


const markers = ref([])

const emit = defineEmits(['clicked']);


function onMapSearchClick(e){
    if(markers.value.length > 0){
        let marker = markers.value.pop();
        mapSearch.value.removeLayer(marker);
    }
        let marker = new leaflet.Marker(e.latlng, {title:"Meta selezionata"}).addTo(mapSearch.value);
        markers.value.push(marker);
        emit('clicked', e.latlng);

}

onMounted(() => {
    mapSearch.value = leaflet.map('mapSearch',{minZoom:12,maxBounds:mapBounds}).setView(startingCoord, startingZoom);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapSearch.value);
    mapSearch.value.on('click', onMapSearchClick);
})

</script>