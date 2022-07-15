<template>
  <div class="iconSelect">
    <n-button
      @click="select(item.name)"
      class="pl-5 pr-5"
      text
      v-for="item in currentPageList"
      :key="item.name"
    >
      <n-icon size="50" :component="item"></n-icon>
    </n-button>

    <n-pagination
      class="pagination"
      v-model:page="page"
      v-model:page-size="pageSize"
      :item-count="total"
      show-size-picker
      :page-sizes="[50, 100, 150, 200]"
    />
  </div>
</template>

<script setup>
import { h, ref, reactive, watch, shallowRef } from "vue";
import * as fa from "@vicons/fa";
import { menuList } from "@/data/menuOne.js";
import { cloneDeep } from "lodash";
const showModal = ref(false);
const iconList = [];
for (const key in fa) {
  iconList.push(fa[key]);
}

const page = ref(1);
const pageSize = ref(50);
const total = ref(iconList.length);
const currentPageList = shallowRef(iconList.slice(0, pageSize.value));
watch([page, pageSize], (newVal, oldVal) => {
  const start = (newVal[0] - 1) * newVal[1];
  const end = start + newVal[1];
  currentPageList.value = iconList.slice(start, end);
});

const emit = defineEmits(["onSelect"]);

const select = function (name) {
  emit("onSelect", name);
};

const menuClone = cloneDeep(menuList);
let newMenuList = [];


const myFilter = function (newArr, oldArr, callback) {
  for (let i = 0; i < oldArr.length; ) {
    const item = oldArr[i];
    let res=callback(item)
    if(res){
      newArr.push(item);
      oldArr.splice(i, 1);
    }
    else {
      i++;
    }
  }
};

const reveal = (menu = [], oldMenu) => {
  if (!menu.length)
    myFilter(menu,oldMenu,item=>item.pid===0)
  for(const i in menu){
    const item=menu[i]
    
    let index=oldMenu.findIndex(element=>element.pid===item.id)
    if(index>=0 && !item.children){
      menu[i]['children']=[]
    }
    if(item.children){
      
      myFilter(item.children,oldMenu,element=>element.pid===item.id)
      reveal(item.children,oldMenu)
      
    }
    
  }
};

reveal(newMenuList,menuClone)
console.log(newMenuList)
</script>

<style lang="less">
.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
