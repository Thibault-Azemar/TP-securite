import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./firebase";

require('@/assets/main.scss');

// 1. Assign app to a variable
let app = createApp(App)

app.use(router).mount('#app')




