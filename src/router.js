import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ './views/HomePage.vue'),
        meta : {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ './views/LoginPage.vue')    
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ './views/RegisterPage.vue')    
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router