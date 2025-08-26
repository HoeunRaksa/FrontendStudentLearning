import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import { useUserStore } from './store/store'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia) // ✅ Pinia must be used before using any store
app.use(Toast)
app.component('apexchart', VueApexCharts)
app.mount('#app')

// ✅ Restore route if token exists
// if (userStore.isAuthenticated) {
//   axios
//     .get('/api/user/last-route', { withCredentials: true })
//     .then(res => {
//       const lastRoute = res.data?.path
//       if (lastRoute && lastRoute !== window.location.pathname) {
//         router.replace(lastRoute)
//       }
//     })
//     .catch(() => {
//       // optional: handle error silently
//     })
// }


// // ✅ Now we can use the store safely
// const userStore = useUserStore()


// // ✅ Save last route when browser is closed/refreshed
// window.addEventListener('beforeunload', () => {
//   if (userStore.isAuthenticated) {
//      axios.post(
//       '/api/user/last-route',
//       { path: window.location.pathname },
//       { withCredentials: true }
//     )
//   }
// })
