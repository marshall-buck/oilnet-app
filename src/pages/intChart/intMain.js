import { createApp } from 'vue';
import App from './Int.vue';
import '../../assets/tailwind.css';
import ButtonBase from '../../components/Buttons/ButtonBase';
const app = createApp(App);

app.component('button-base', ButtonBase);

app.mount('#app');
