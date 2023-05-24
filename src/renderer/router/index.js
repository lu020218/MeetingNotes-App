import { createRouter, createWebHistory } from 'vue-router'

const Setting = () => import('@/renderer/views/SettingDialog.vue')
const Index = () => import('@/renderer/views/App.vue')

const history = createWebHistory(process.env.BASE_URL)

const routers = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/setting',
        name: 'setting',
        component: Setting
    }
]

const router = createRouter({
    history: history,
    routes: routers,
    mode: 'hash'
})

export default router