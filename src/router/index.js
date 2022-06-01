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
        redirect: '/home',
        component: Layout,
        children: [{
            path: 'home',
            name: 'myhome',
            meta: {
                title: '首页'
            },
            component: () => import('@/pages/home/index.vue'),
        }]

    },
    {
        path: '/demo',
        meta: {
            title: 'demo',
            icon: 'Dev',
        },
        name: 'demo',
        component: Layout,
        redirect: '/demo/demo1',
        children: [{
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
    },
    {
        path: '/sys',
        name: 'sys',
        redirect: '/sys/user',
        meta: {
            title: '系统管理',
        },
        component: Layout,
        children:[
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理',
                    icon: 'User',
                },
                component: () => import('@/pages/sys/user.vue'),

            },
            {
                path: 'role',
                name: 'role',
                meta: {
                    title: '角色管理',
                    icon: 'Role',
                },
                component: () => import('@/pages/sys/role.vue'),
            },
            {
                path:'permission',
                name:'permission',
                meta:{
                    title:'权限管理',
                    icon:'Permission',
                },
                component:()=>import('@/pages/sys/permission.vue'),
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