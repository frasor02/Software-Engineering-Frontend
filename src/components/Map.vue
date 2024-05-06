<template>
    <div id="map" style="width: 400px;height: 400px"></div>
</template>

<script setup>
import {onMounted, ref } from 'vue';
import {map, mountMap} from "@/states/mappa.js"
const props = defineProps(['lat', 'long'])

onMounted(() => {
    mountMap(props.lat,props.long);
})

</script>