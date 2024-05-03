<script setup>
import {onMounted } from 'vue';
import { parkid, error, fetchParkId } from '../states/parcheggio.js';
const props = defineProps(['parcheggioId'])


onMounted(() => {
    fetchParkId(props.parcheggioId);
})
</script>

<template>
    <div v-if="error">{{ error }}</div>
    <div v-if="parkid">
        <h3>{{parkid}}</h3>
    </div>
</template>