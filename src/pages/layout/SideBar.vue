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

<script setup>
import { h, ref } from 'vue';
import { Home, HomeOutline } from '@vicons/ionicons5';
import { NMenu, NIcon } from 'naive-ui';
import {Dev, User} from '@vicons/fa'
import router, {routes} from '../../router';
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions=[
    {
        label:'首页',
        path:'/',
        key:'home',
        icon:renderIcon(Home)
    },
    {
      label:'用户管理',
      path:'/user',
      key:'user',
      icon:renderIcon(User)
    },
    {
        label:'demo',
        key:'demo',
        path:'/demo',
        icon:renderIcon(Dev),
        children:[
          {
            label:'demo1',
            key:'demo1',
            path:'/demo/demo1',
            icon:renderIcon(Dev),
          },
          {
            label:'demo2',
            key:'demo2',
            path:'/demo/demo2',
            icon:renderIcon(Dev),
          },
        ]
    }
]

let actived=ref('')
function handleUpdateValue(key,item){
  router.push(item.path)
}

</script>

<style></style>
