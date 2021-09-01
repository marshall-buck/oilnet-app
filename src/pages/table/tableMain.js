import { createApp } from 'vue';
import App from './Table.vue';
import '../../assets/tailwind.css';
import ButtonBase from '../../components/Buttons/ButtonBase';
const app = createApp(App);

app.component('button-base', ButtonBase);

app.mount('#app');
