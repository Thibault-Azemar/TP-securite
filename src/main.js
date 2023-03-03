import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./firebase";
import db from "./firebase";
require('@/assets/main.scss');

createApp(App).use(router).mount('#app')

export default{
    db : db
}



