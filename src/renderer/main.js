import { createApp } from 'vue'
import App from './views/App'
import router from './router'

console.log(router.getRoutes());

router.beforeEach((to, from)=>{
    console.log('to:' + to.name + ',from:' + from.name)
})

createApp(App).use(router).mount('#app')
