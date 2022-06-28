// import Router from 'vue-router'
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/pages/layout/index.vue";
import { menuOptions } from "../data/menu";
import { getMenuApi } from "@/api/sys.js";

// console.log(menuList)

const menuRoutes = menuOptions.map((item) => {
  if (item.children) {
    return {
      ...item,
      icon: null,
      redirect: item.children[0].path,
      component: Layout,
    };
  }
  return {
    path: item.path,
    name: item.name + "Layout",
    redirect: item.path,
    component: Layout,
    children: [
      {
        ...item,
        path: item.path,
      },
    ],
  };
});

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
        },
        component: () => import("@/pages/home/index.vue"),
      },
    ],
  },

  // {
  //   path: "/sys",
  //   name: "sys",
  //   redirect: "/sys/user",
  //   meta: {
  //     title: "系统管理",
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: "user",
  //       name: "user",
  //       meta: {
  //         title: "用户管理",
  //         icon: "User",
  //       },
  //       component: () => import("@/pages/sys/user.vue"),
  //     },
  //     {
  //       path: "role",
  //       name: "role",
  //       meta: {
  //         title: "角色管理",
  //         icon: "Role",
  //       },
  //       component: () => import("@/pages/sys/role.vue"),
  //     },
  //     {
  //       path: "menu",
  //       name: "menu",
  //       meta: {
  //         title: "权限管理",
  //       },
  //       component: () => import("@/pages/sys/menu.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/echart",
  //   name: "echart",
  //   redirect: "/echart/line",
  //   meta: {
  //     title: "图表",
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: "line",
  //       name: "line",
  //       meta: {
  //         title: "折线图",
  //         icon: "Line",
  //       },
  //       component: () => import("@/pages/echart/line.vue"),
  //     },
  //     {
  //       path: "bar",
  //       name: "bar",
  //       meta: {
  //         title: "柱状图",
  //         icon: "Bar",
  //       },
  //       component: () => import("@/pages/echart/bar.vue"),
  //     },
  //     {
  //       path: "pie",
  //       name: "pie",
  //       meta: {
  //         title: "饼图",
  //         icon: "Pie",
  //       },
  //       component: () => import("@/pages/echart/pie.vue"),
  //     },
  //     {
  //       path: "radar",
  //       name: "radar",
  //       meta: {
  //         title: "雷达图",
  //         icon: "Radar",
  //       },
  //       component: () => import("@/pages/echart/radar.vue"),
  //     },
  //     {
  //       path: "ring",
  //       name: "ring",
  //       meta: {
  //         title: "环形图",
  //         icon: "Ring",
  //       },
  //       component: () => import("@/pages/echart/ring.vue"),
  //     }
  //   ]
  // },
  // {
  //   path:"/form",
  //   name:"form",
  //   redirect:"/form/editor",
  //   meta:{
  //     title:"表单组件",
  //     },
  //   component:Layout,
  //   children:[
  //     {
  //       path:"editor",
  //       name:"editor",
  //       meta:{
  //         title:"富文本编辑器",
  //         icon:"Editor",
  //       },
  //       component:()=>import("@/pages/form/editor.vue"),
  //     },
  //     {
  //       path:"upload",
  //       name:"upload",
  //       meta:{
  //         title:"上传组件",
  //         icon:"Upload",
  //       },
  //       component:()=>import("@/pages/form/upload.vue"),
  //     }
  //   ]

  // },
  // {
  //   path:'/demo',
  //   name:'Demo',
  //   component:Layout,
  //   meta:{
  //     title:'demo'
  //   },
  //   children:[
  //     {
  //       path:'/demo',
  //       name:'demo',
  //       meta:{
  //         title:'demo'
  //       },
  //       component:()=>import('@/pages/demo.vue')
  //     }
  //   ]
  // },
  // ...menuRoutes,
  {
    path: "/no_right",
    name: "no_right",
    redirect: "/no_right/index",
    meta: {
      title: "权限",
    },
    component: Layout,
    children: [
      {
        path: "index",
        name: "no_right_index",
        meta: {
          title: "无权限",
        },
        component: () => import("@/components/NoRight.vue"),
      },
    ],
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
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: "/404",
  // }
];

// export { routes };

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


const modules = import.meta.glob("../pages/**/*.vue");

function formatRoutes(menu) {
  const newMenu = menu.map((item) => {
    if (item.icon) {
      item.icon = null;
    }
    if (item.component) {
      item.component = modules[item.component];
    }
    if (item.children) {
      item.children = formatRoutes(item.children);
    }
    return item;
  });
  return newMenu;
}

async function getRouteList() {
  const res = await getMenuApi();
  if (res.status == 200) {
    const routeList = formatRoutes(res.data);

    const newRoutes = routeList.map((item) => {
      if (item.children) {
        return {
          ...item,
          icon: null,
          redirect: item.children[0].path,
          component: Layout,
        };
      }
      return {
        path: item.path,
        name: item.name + "Layout",
        component: Layout,
        children: [
          {
            ...item,
            path: item.path,
          },
        ],
      };
    });
    return newRoutes

    
  }
}





let hasRoles=true

router.beforeEach( async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // if(to.redirectedFrom){
  //   router.replace(to.redirectedFrom)
  // }
  if (to.path === "/login") {
    next();
  } else {
    // const user_id = localStorage.getItem("userId");
    const userStr = localStorage.getItem("userInfo");
    const user = JSON.parse(userStr);
    if (user && user.uid) {
      // if (/^\/sys\/.*/.test(to.path) && user.role_id != 1) {
      //   next("/no_right/index");
      // }
      const routeList=await getRouteList()
      if(hasRoles){
        routeList.forEach(item=>{
          router.addRoute(item)
        })
        hasRoles=false
        next({...to,replace:true})

      }else{
        next()
      }
      
      
      
      
    } else {
      console.log("未登录");
      next("/login");
    }
  }
});

export default router;
