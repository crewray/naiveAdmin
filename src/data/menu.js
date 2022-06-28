import { h,reactive } from "vue";
import { NIcon } from "naive-ui";
import * as fa from "@vicons/fa";
import { getMenuApi } from "@/api/sys.js";
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuList = reactive([]);
getMenuApi().then((res) => {
  if (res.status == 200) {
    Object.assign(menuList,formatMenu(res.data));
    
  }
});
function formatMenu(menu) {
  const newMenu = menu.map((item) => {
    
    if (item.icon) {
      item.icon = renderIcon(fa[item.icon]);
    }
    if(item.component){
      item.component=()=>import(item.component)
    }
    if (item.children) {
      item.children = formatMenu(item.children);
    }
    return item
  });
  return newMenu
}
// menuList=formatMenu(menuList)

export { menuList };
export const menuOptions = [
  {
    title: "首页",
    path: "/home",
    name: "home",
    icon: renderIcon(fa.Home),
    component: () => import("@/pages/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    title: "echart组件",
    path: "/echart",
    name: "echart",
    meta: {
      title: "图表",
    },
    icon: renderIcon(fa.ChartBar),
    children: [
      {
        title: "折线图",
        path: "/echart/line",
        name: "line",
        meta: {
          title: "折线图",
          icon: "Line",
        },
        icon: renderIcon(fa.ChartBar),
        component: () => import("@/pages/echart/line.vue"),
      },
      {
        title: "柱状图",
        path: "/echart/bar",
        name: "bar",
        meta: {
          title: "柱状图",
          icon: "Bar",
        },
        icon: renderIcon(fa.ChartBar),
        component: () => import("@/pages/echart/bar.vue"),
      },
      {
        title: "饼图",
        path: "/echart/pie",
        name: "pie",
        meta: {
          title: "饼图",
          icon: "Pie",
        },
        icon: renderIcon(fa.ChartBar),
        component: () => import("@/pages/echart/pie.vue"),
      },
      {
        title: "雷达图",
        path: "/echart/radar",
        name: "radar",
        meta: {
          title: "雷达图",
          icon: "Radar",
        },
        icon: renderIcon(fa.ChartBar),
        component: () => import("@/pages/echart/radar.vue"),
      },
      {
        title: "环形图",
        path: "/echart/ring",
        name: "ring",
        meta: {
          title: "环形图",
          icon: "Ring",
        },
        icon: renderIcon(fa.ChartBar),
        component: () => import("@/pages/echart/ring.vue"),
      },
    ],
  },
  {
    title: "表单组件",
    path: "/form",
    name: "form",
    meta: {
      title: "表单组件",
    },
    icon: renderIcon(fa.Wpforms),
    children: [
      {
        title: "富文本编辑器",
        path: "/form/editor",
        name: "editor",
        meta: {
          title: "富文本编辑器",
          icon: "Editor",
        },
        icon: renderIcon(fa.Edit),
        component: () => import("@/pages/form/editor.vue"),
      },
      {
        title: "上传组件",
        path: "/form/upload",
        name: "upload",
        meta: {
          title: "上传组件",
          icon: "Upload",
        },
        icon: renderIcon(fa.Upload),
        component: () => import("@/pages/form/upload.vue"),
      },
    ],
  },
  {
    title: "demo",
    path: "/demo",
    name: "demo",
    meta: {
      title: "demo",
    },
    icon: renderIcon(fa.Wrench),
    component: () => import("@/pages/demo.vue"),
  },
  {
    title: "系统管理",
    path: "/sys",
    name: "system",
    icon: renderIcon(fa.Wrench),
    meta: {
      title: "系统管理",
    },
    children: [
      {
        title: "用户管理",
        path: "/sys/user",
        name: "user",
        meta: {
          title: "用户管理",
        },
        icon: renderIcon(fa.User),
        component: () => import("@/pages/sys/user.vue"),
      },
      {
        title: "角色管理",
        path: "/sys/role",
        name: "role",
        meta: {
          title: "角色管理",
        },
        icon: renderIcon(fa.UserEdit),
        component: () => import("@/pages/sys/role.vue"),
      },
      {
        title: "菜单管理",
        path: "/sys/menu",
        name: "menu",
        meta: {
          title: "菜单管理",
        },
        icon: renderIcon(fa.Bars),
        component: () => import("@/pages/sys/menu.vue"),
      },
    ],
  },
];
