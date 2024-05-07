<template>
    <div id="mapSearch" style="width: 400px;height: 400px"></div>
</template>

<script setup>
import {onMounted,ref } from 'vue';
import {mapSearch} from "@/states/mappa.js"
import leaflet from "leaflet";


const markers = ref([])

const emit = defineEmits(['clicked']);

function onMapSearchClick(e){
    if(markers.value.length > 0){
        let marker = markers.value.pop();
        mapSearch.value.removeLayer(marker);
    }
        let marker = new leaflet.Marker(e.latlng).addTo(mapSearch.value);
        markers.value.push(marker);
        emit('clicked', e.latlng);

}

onMounted(() => {
    mapSearch.value = leaflet.map('mapSearch').setView([46.06722058076118, 11.122747968511277], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapSearch.value);
    mapSearch.value.on('click', onMapSearchClick);
})

</script>