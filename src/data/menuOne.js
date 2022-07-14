export const menuList=[
    {
        "id": 1,
        "pid": 0,
        "title": "首页",
        "path": "/home",
        "name": "home",
        "icon": "Home",
        "component": "/src/pages/home/index.vue",
        "meta": {
            "title": "首页"
        }
    },
    {
        "id": 2,
        "pid": 0,
        "title": "echart组件",
        "path": "/echart",
        "name": "echart",
        "meta": {
            "title": "图表"
        },
        "icon": "ChartBar"
    },
    {
        "id": 6,
        "pid": 2,
        "title": "折线图",
        "path": "/echart/line",
        "name": "line",
        "meta": {
            "title": "折线图"
        },
        "icon": "ChartBar",
        "component": "/src/pages/echart/line.vue"
    },
    {
        "id": 7,
        "pid": 2,
        "title": "柱状图",
        "path": "/echart/bar",
        "name": "bar",
        "meta": {
            "title": "柱状图"
        },
        "icon": "ChartBar",
        "component": "/src/pages/echart/bar.vue"
    },
    {
        "id": 8,
        "pid": 2,
        "title": "饼图",
        "path": "/echart/pie",
        "name": "pie",
        "meta": {
            "title": "饼图"
        },
        "icon": "ChartBar",
        "component": "/src/pages/echart/pie.vue"
    },
    {
        "id": 9,
        "pid": 2,
        "title": "雷达图",
        "path": "/echart/radar",
        "name": "radar",
        "meta": {
            "title": "雷达图"
        },
        "icon": "ChartBar",
        "component": "/src/pages/echart/radar.vue"
    },
    {
        "id": 10,
        "pid": 2,
        "title": "环形图",
        "path": "/echart/ring",
        "name": "ring",
        "meta": {
            "title": "环形图"
        },
        "icon": "ChartBar",
        "component": "/src/pages/echart/ring.vue"
    },
    {
        "id": 3,
        "pid": 0,
        "title": "表单组件",
        "path": "/form",
        "name": "form",
        "meta": {
            "title": "表单组件"
        },
        "icon": "Wpforms"
    },
    {
        "id": 11,
        "pid": 3,
        "title": "富文本编辑器",
        "path": "/form/editor",
        "name": "editor",
        "meta": {
            "title": "富文本编辑器"
        },
        "icon": "Edit",
        "component": "/src/pages/form/editor.vue"
    },
    {
        "id": 12,
        "pid": 2,
        "title": "上传组件",
        "path": "/form/upload",
        "name": "upload",
        "meta": {
            "title": "上传组件"
        },
        "icon": "Upload",
        "component": "/src/pages/form/upload.vue"
    },
    {
        "id": 4,
        "pid": 0,
        "title": "demo",
        "path": "/demo",
        "name": "demo",
        "meta": {
            "title": "demo"
        },
        "icon": "Wrench",
        "component": "/src/pages/demo/demo.vue"
    },
    {
        "id": 5,
        "pid": 0,
        "title": "系统管理",
        "path": "/sys",
        "name": "system",
        "icon": "Wrench",
        "meta": {
            "title": "系统管理"
        }
    },
    {
        "id": 13,
        "pid": 3,
        "title": "用户管理",
        "path": "/sys/user",
        "name": "user",
        "meta": {
            "title": "用户管理"
        },
        "icon": "User",
        "component": "/src/pages/sys/user.vue"
    },
    {
        "id": 14,
        "pid": 3,
        "title": "角色管理",
        "path": "/sys/role",
        "name": "role",
        "meta": {
            "title": "角色管理"
        },
        "icon": "UserEdit",
        "component": "/src/pages/sys/role.vue"
    },
    {
        "id": 15,
        "pid": 3,
        "title": "菜单管理",
        "path": "/sys/menu",
        "name": "menu",
        "meta": {
            "title": "菜单管理"
        },
        "icon": "Bars",
        "component": "/src/pages/sys/menu.vue"
    }
]