import { createApp } from 'vue'
import App from './views/App'
import router from './router'

console.log(router.getRoutes());

createApp(App).use(router).mount('#app')
