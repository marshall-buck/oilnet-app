import { createApp } from 'vue';
import App from './Test.vue';
import '../../assets/tailwind.css';
import { store } from './store';
const app = createApp(App);

app.use(store);

app.mount('#app');
