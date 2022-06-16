// import Router from 'vue-router'
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/pages/layout/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
      icon: "Home",
    },
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "myhome",
        meta: {
          title: "首页",
        },
        component: () => import("@/pages/home/index.vue"),
      },
    ],
  },
  
  {
    path: "/sys",
    name: "sys",
    redirect: "/sys/user",
    meta: {
      title: "系统管理",
    },
    component: Layout,
    children: [
      {
        path: "user",
        name: "user",
        meta: {
          title: "用户管理",
          icon: "User",
        },
        component: () => import("@/pages/sys/user.vue"),
      },
      {
        path: "role",
        name: "role",
        meta: {
          title: "角色管理",
          icon: "Role",
        },
        component: () => import("@/pages/sys/role.vue"),
      },
      {
        path: "permission",
        name: "permission",
        meta: {
          title: "权限管理",
          icon: "Permission",
        },
        component: () => import("@/pages/sys/permission.vue"),
      },
    ],
  },
  {
    path: "/echart",
    name: "echart",
    redirect: "/echart/line",
    meta: {
      title: "图表",
    },
    component: Layout,
    children: [
      {
        path: "line",
        name: "line",
        meta: {
          title: "折线图",
          icon: "Line",
        },
        component: () => import("@/pages/echart/line.vue"),
      },
      {
        path: "bar",
        name: "bar",
        meta: {
          title: "柱状图",
          icon: "Bar",
        },
        component: () => import("@/pages/echart/bar.vue"),
      },
      {
        path: "pie",
        name: "pie",
        meta: {
          title: "饼图",
          icon: "Pie",
        },
        component: () => import("@/pages/echart/pie.vue"),
      },
      {
        path: "radar",
        name: "radar",
        meta: {
          title: "雷达图",
          icon: "Radar",
        },
        component: () => import("@/pages/echart/radar.vue"),
      },
      {
        path: "ring",
        name: "ring",
        meta: {
          title: "环形图",
          icon: "Ring",
        },
        component: () => import("@/pages/echart/ring.vue"),
      }
    ]
  },
  {
    path:"/form",
    name:"form",
    redirect:"/form/editor",
    meta:{
      title:"表单组件",
      },
    component:Layout,
    children:[
      {
        path:"editor",
        name:"editor",
        meta:{
          title:"富文本编辑器",
          icon:"Editor",
        },
        component:()=>import("@/pages/form/editor.vue"),
      },
      {
        path:"upload",
        name:"upload",
        meta:{
          title:"上传组件",
          icon:"Upload",
        },
        component:()=>import("@/pages/form/upload.vue"),
      }
    ]

  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/404",
    name: "NotFound",
    redirect: "/404/notfound",
    component: () => Layout,
    meta: {
      title: "404",
    },
    children: [
      {
        path: "notfound",
        name: "notfound",
        meta: {
          title: "notfound",
        },
        component: () => import("@/components/NotFound.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

export { routes };

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.path === "/login") {
    next();
  } else {
    // const user_id = localStorage.getItem("userId");
    const userStr=localStorage.getItem("userInfo");
    const user=JSON.parse(userStr);
    if(user&&user.uid){
      next();
    }
    else{
      console.log("未登录");
      next("/login");
    }
    // let user_id=user.uid;
    // if (!user.uid||!user) {
    //   next("/login");
    // } else {
    //   next();
    // }
  }
});

export default router;
