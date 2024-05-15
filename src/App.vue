<script setup>
//import { ref, onUpdated} from 'vue';
import { RouterView, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

/*const router = useRouter();

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

router.afterEach((to, from) => {forceRerender()});*/

</script>

<template>
  <v-app>
    <Navbar> </Navbar>
    <RouterView/>
  </v-app>
</template>