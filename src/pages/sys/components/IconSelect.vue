<template>
  <div class="iconSelect">
    <n-input-group  class="mb-20">
      
      <n-input v-model:value="search" placeholder="请输入" />
      <n-button @click="searchIcon" type="primary" ghost>
        搜索
      </n-button>
    </n-input-group>
      <n-button @click="select(item.name)" class="pl-5 pr-5"  text v-for="item in currentPageList" :key="item.name">
        <n-icon size="50"  :component="item"></n-icon>
      </n-button>
      
      <n-pagination
        class="pagination"
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="total"
        show-size-picker
        :page-sizes="[ 20, 30, 40, 50 ]"
        :on-update:page="changePage"
        :on-update:page-size="changeSize"
      />
  </div>
</template>

<script setup>
import { h, ref,reactive, watch,shallowRef } from "vue";
import * as fa from "@vicons/fa";
const showModal=ref(false);
const iconList = [];
for (const key in fa) {
  iconList.push(fa[key]);
}

const page=ref(1);
const pageSize=ref(50);
const total=ref(iconList.length);


const currentPageList=shallowRef(iconList.slice(0,pageSize.value));
const search=ref('')
const searchIcon=()=>{
  console.log(search)
  loadList()
}
const loadList=()=>{
  let searchList=iconList
  if(search.value)
    searchList=iconList.filter(item=>item.name.toLowerCase().includes(search.value.toLowerCase()))
  let start=(page.value-1)*pageSize.value
  let end=start+pageSize.value
  currentPageList.value=searchList.slice(start,end)
}

const changePage=(pageNum)=>{
  page.value=pageNum
  loadList()
}

const changeSize=(pageSizeNum)=>{
  pageSize.value=pageSizeNum
  loadList()
}

const emit=defineEmits(['onSelect']);


const select=function(name){
  emit('onSelect',name);
}






</script>

<style lang="less">
.pagination{
  margin-top: 20px;
  justify-content: flex-end;
}

</style>
