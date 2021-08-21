import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import store from './store';

import ButtonBase from './components/Buttons/ButtonBase';

const app = createApp(App);

app.component('button-base', ButtonBase);
app.use(store);
app.mount('#app');
