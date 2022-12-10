import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

import DashboardLayout from './layout/DashboardLayout.vue';
import SampleLayout from './layout/SampleLayout.vue';
import EmptyLayout from './layout/EmptyLayout.vue';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('sample-layout', SampleLayout);
app.component('empty-layout', EmptyLayout);

app.use(router);
app.mount('#app');
