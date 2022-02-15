// import Router from 'vue-router'
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Layout from '@/pages/layout/index.vue'




const routes = [{
        path: '/',
        name: 'home',
        meta: {
            title: '首页',
            icon: 'Home'
        },
        redirect:'/home',
        component:Layout,
        children:[
            {
                path:'home',
                name:'myhome',
                meta:{
                    title:'首页'
                },
                component:() => import('@/pages/demo/index.vue'),
            }
        ]

    },
    {
        path: '/demo',
        meta: {
            title: 'demo',
            icon: 'Dev',
        },
        name: 'demo',
        component:Layout,
        redirect:'/demo/demo1',
        children: [
            {
            path: 'demo1',
            meta: {
                title: 'demo1',
                icon: 'Dev',
            },
            name: 'demo1',
            component: () => import('@/pages/demo/demo1.vue'),
        },
        {
            path: 'demo2',
            meta: {
                title: 'demo2',
                icon: 'Dev',
            },
            name: 'demo2',
            component: () => import('@/pages/demo/demo2.vue'),
        }
    ]
    }
]

export {
    routes
}

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router