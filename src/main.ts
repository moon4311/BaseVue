import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import naive from 'naive-ui';
import axios from 'axios';
import './assets/main.css';

import _ from 'lodash';



import DashboardLayout from './layout/DashboardLayout.vue';
import SampleLayout from './layout/SampleLayout.vue';
import EmptyLayout from './layout/EmptyLayout.vue';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('sample-layout', SampleLayout);
app.component('empty-layout', EmptyLayout);

app.use(router);
app.use(naive);

app.config.globalProperties.$axios = axios;
app.config.globalProperties._ = _;

app.provide('$axios',axios);
app.provide('_',_);

app.mount('#app');
