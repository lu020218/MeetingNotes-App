import { createRouter, createWebHashHistory } from 'vue-router'

// const Setting = () => import('../views/SettingDialog.vue')
//const Index = () => import('@/renderer/views/App.vue')
import Index from '@/renderer/views/notes/NotesPage.vue'
import Setting from '@/renderer/views/setting/SettingDialog.vue'
import Export from '@/renderer/views/export/ExportView.vue'

const history = createWebHashHistory(process.env.BASE_URL)

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
    },
    {
        path: '/export',
        name: 'export',
        component: Export
    }
]

const router = createRouter({
    history: history,
    routes: routers,
    base: '/'
})

export default router