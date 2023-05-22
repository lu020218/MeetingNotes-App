import { createApp } from 'vue'
import App from './views/App'
import { router } from '../renderer/router'

createApp(App).use(router).mount('#app')
