<template>
  <n-menu
    :inverted="true"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="reactiveData.menuList"
    :value="actived"
    @update:value="handleUpdateValue"
    class="side-menu"
    label-field="title"
    key-field="name"
  >
  </n-menu>
</template>

<style lang="less"></style>

<script setup>
import { h, ref, inject, reactive } from "vue";
import * as fa from "@vicons/fa";
import { NIcon } from "naive-ui";

import { useRouter } from "vue-router";
import { getRoleMenuApi,getMenuApi } from "@/api/sys.js";

import {toTree} from '@/utils/toTree.js'


function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const router = useRouter();
let actived = ref("");
function handleUpdateValue(key, item) {
  actived.value = key;
  router.push(item.path);
}



function formatMenu(menu) {
  const newMenu = menu.map((item) => {
    
    
    if (item.icon) {
      item.icon = renderIcon(fa[item.icon]);
    }
    
    return item
  });
  return newMenu
}


const reactiveData= reactive({
  menuList:[]
})

const menus=reactive([])
const roleMenu = reactive([]);
const user = inject("user");

const getRoleMenu= (menu=[],access=[])=>{
  return menu.filter(item=> access.includes(item.path))
}

const getUserAccess=async (menu)=>{
  const res=await getRoleMenuApi(user.role_id)
  const access=res.data.access
  return getRoleMenu(menu,access)
}
getMenuApi().then(async (res)=>{
  // getUserAccess()
  const tmp=formatMenu(res.data)
  let roleMenu=[]
  if(user.role_id !==1){
    roleMenu= await getUserAccess(tmp)
  }else{
    roleMenu=tmp
  }
  reactiveData.menuList= toTree(roleMenu)
  
})




// const user = inject("user");
// const menuFilter = (menu = [], access = []) => {
//   return menu.filter((item) => {
//     if (item.children) {
//       item.children = menuFilter(item.children, access);
//     }
//     return access.includes(item.path);
//   });
// };
// if (user.role_id !== 1) {
//   getRoleMenuApi(user.role_id).then((res) => {
//     if (res.status == 200) {
//       const access = res.data.access;
//       // console.log(access)
//       // console.log(menuFilter(roleMenu, access));
//       reactiveData.menuList.splice(0, reactiveData.menuList.length, ...menuFilter(reactiveData.menuList, access));
//     }
//   });
// }else{
//   Object.assign(reactiveData.menuList,menus)
// }
</script>
