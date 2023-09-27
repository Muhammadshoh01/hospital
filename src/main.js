import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueCookies, { expires: '7d' })
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
