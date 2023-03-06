import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./firebase";

require('@/assets/main.scss');

createApp(App).use(router).mount('#app')




