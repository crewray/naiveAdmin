import { h } from "vue";
import { NIcon } from "naive-ui";
import { Home, User, UserEdit, ChartBar, Wpforms, Edit, Upload,Wrench, Bars } from "@vicons/fa";
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const menuOptions = [
  {
    title: "首页",
    path: "/home",
    name: "home",
    icon: renderIcon(Home),
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
    icon: renderIcon(ChartBar),
    children: [
      {
        title: "折线图",
        path: "/echart/line",
        name: "line",
        meta: {
          title: "折线图",
          icon: "Line",
        },
        icon: renderIcon(ChartBar),
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
        icon: renderIcon(ChartBar),
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
        icon: renderIcon(ChartBar),
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
        icon: renderIcon(ChartBar),
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
        icon: renderIcon(ChartBar),
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
    icon: renderIcon(Wpforms),
    children: [
      {
        title: "富文本编辑器",
        path: "/form/editor",
        name: "editor",
        meta: {
          title: "富文本编辑器",
          icon: "Editor",
        },
        icon: renderIcon(Edit),
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
        icon: renderIcon(Upload),
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
    icon: renderIcon(Wrench),
    component: () => import("@/pages/demo.vue"),
  },
  {
    title: "系统管理",
    path: "/sys",
    name: "system",
    icon: renderIcon(Wrench),
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
        icon: renderIcon(User),
        component: () => import("@/pages/sys/user.vue"),
      },
      {
        title: "角色管理",
        path: "/sys/role",
        name: "role",
        meta: {
          title: "角色管理",
        },
        icon: renderIcon(UserEdit),
        component: () => import("@/pages/sys/role.vue"),
      },
      {
        title: "菜单管理",
        path: "/sys/menu",
        name: "menu",
        meta: {
          title: "菜单管理",
        },
        icon: renderIcon(Bars),
        component: () => import("@/pages/sys/menu.vue"),
      },
    ],
  },
];
