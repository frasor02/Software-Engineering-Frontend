<template>
    <div id="mapSearch" style="width: 400px;height: 400px"></div>
</template>

<script setup>
import {onMounted } from 'vue';
import {mapSearch, mountMapSearch} from "@/states/mappa.js"

onMounted(() => {
    mountMapSearch(46.06722058076118, 11.122747968511277);
})

</script>