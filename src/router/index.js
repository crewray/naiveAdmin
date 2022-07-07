// import Router from 'vue-router'
import { inject } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/pages/layout/index.vue";
import { getMenuApi, getRoleMenuApi } from "@/api/sys.js";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const modules = import.meta.glob("/src/pages/**/*.vue");

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

const menuFilter = (menu = [], access = []) => {
  return menu.filter((item) => {
    if (item.children) {
      item.children = menuFilter(item.children, access);
    }
    return access.includes(item.path);
  });
};

const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

async function getRouteList() {
  const res = await getMenuApi();
  if (user && user.role_id !== 1) {
    const access = await getRoleMenuApi(user.role_id);
  }
  if (res.status == 200) {
    let routeList = formatRoutes(res.data);
    if (user && user.role_id !== 1) {
      if (access.status == 200) {
        routeList = menuFilter(routeList, access.data);
      }
    }

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
        ...item,
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
    return newRoutes;
  }
}

let hasRoles = true;

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.path === "/login") {
    next();
  } else {
    const userStr = localStorage.getItem("userInfo");
    const user = JSON.parse(userStr);
    if (user && user.uid) {
      // if (/^\/sys\/.*/.test(to.path) && user.role_id != 1) {
      //   next("/no_right/index");
      // }
      const routeList = await getRouteList();
      if (hasRoles) {
        routeList.forEach((item) => {
          router.addRoute(item);
        });
        hasRoles = false;
        next({ ...to, replace: true });
      } else {
        next();
      }
    } else {
      console.log("未登录");
      next("/login");
    }
  }
});

export default router;
