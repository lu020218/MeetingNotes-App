import { createRouter, createWebHistory } from 'vue-router'

const Setting = () => import('@/pages/SettingDialog.vue')

const history = createWebHistory(process.env.BASE_URL)

const routers = [
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