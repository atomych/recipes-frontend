import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import router from '@/router';
import infraPlugin from '@/infrastructure/infra-plugin.ts';

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(ToastService);
app.use(router);
app.use(infraPlugin);
app.mount('#app');
