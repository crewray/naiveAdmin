<template>
  <n-menu
    :inverted="true"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :value="actived"
    @update:value="handleUpdateValue"
    class="side-menu"
  />
</template>

<style lang="less">

</style>

<script setup>
import { h, ref } from 'vue';
import { Home, HomeOutline, Menu } from '@vicons/ionicons5';
import { NMenu, NIcon } from 'naive-ui';
import {Dev, User,UserEdit} from '@vicons/fa'
import {MdSettings} from '@vicons/ionicons4'
import router, {routes} from '../../router';
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions=[
    {
      label:'后台管理系统',
      key:'title',
      path:'/',
    },
    {
        label:'首页',
        path:'/',
        key:'home',
        icon:renderIcon(Home)
    },
    {
      label:'系统管理',
      path:'/sys',
      key:'system',
      icon:renderIcon(MdSettings),
      children:[
        {
          label:'用户管理',
          path:'/sys/user',
          key:'user',
          icon:renderIcon(User)
        },
        {
          label:'角色管理',
          path:'/sys/role',
          key:'role',
          icon:renderIcon(UserEdit)
        },
        {
          label:'权限管理',
          path:'/sys/permission',
          key:'permission',
          icon:renderIcon(Menu)
        },
      ]
    },
    // {
    //     label:'demo',
    //     key:'demo',
    //     path:'/demo',
    //     icon:renderIcon(Dev),
    //     children:[
    //       {
    //         label:'demo1',
    //         key:'demo1',
    //         path:'/demo/demo1',
    //         icon:renderIcon(Dev),
    //       },
    //       {
    //         label:'demo2',
    //         key:'demo2',
    //         path:'/demo/demo2',
    //         icon:renderIcon(Dev),
    //       },
    //     ]
    // }
]

let actived=ref('')
function handleUpdateValue(key,item){
  actived.value=key
  router.push(item.path)
}

</script>


