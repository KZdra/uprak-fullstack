import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import router from './router'

const app = createApp(App) // Create the Vue app instance

// Use Vue Router
app.use(VueRouter)

// Use the router instance
app.use(router)

// Mount the app to the #app element in your HTML
app.mount('#app')

// Import Bootstrap JavaScript after creating the app instance
import 'bootstrap/dist/js/bootstrap.js'
