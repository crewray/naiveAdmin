<template>
  <n-menu
    :inverted="true"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :value="actived"
    :collapsed="collapsed"
    @update:value="handleUpdateValue"
    class="side-menu"
    label-field="title"
    key-field="name"
  />
</template>

<style lang="less">

</style>

<script setup>
import { h, ref,inject } from 'vue';
import { Home, HomeOutline, Menu } from '@vicons/ionicons5';
import { NMenu, NIcon } from 'naive-ui';
import {Dev, User,UserEdit, ChartBar,Wpforms, Edit,Upload} from '@vicons/fa'
import {MdSettings} from '@vicons/ionicons4'
import router, {routes} from '../../router';
import {menuOptions} from '@/data/menu.js'
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}


let actived=ref('')
function handleUpdateValue(key,item){
  actived.value=key
  router.push(item.path)
}



</script>


