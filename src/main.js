import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

// Vuetify
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Components
const vuetify = createVuetify({
  components,
  directives,
})


app.use(vuetify)
app.use(router)

app.mount('#app')
