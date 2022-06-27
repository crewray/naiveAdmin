<template>
  <div class="tags mt-10 pl-10">
    <n-space>
      <n-tag
        class="pointer"
        :closable="item[0] === '/home' ? false : true"
        :type="item[0] === active ? 'success' : 'info'"
        @close.stop="close(item[0])"
        @click="switchPage(item[0])"
        v-for="item in pageStack"
        :key="item[0]"
        >{{ item[1] }}</n-tag
      >
    </n-space>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const pageMap = new Map();
pageMap.set("/home", '首页');
const pageStack = reactive(pageMap);
const active=ref('/home')
const route = useRoute();
watch(
  () => route.matched,
  (newVal, oldVal) => {
    if(!newVal[1]){
      return;
    }
    if(newVal[0].path==='/404'){
      return
    }
    active.value = newVal[1].path
    if(!pageStack.has(newVal[1].path)){
      pageStack.set(newVal[1].path, newVal[1].meta.title)
    }
    
  }
);

const close = (item) => {
  pageStack.delete(item);
  if(item === active.value){
    switchPage('/home')
  }
};

const router=useRouter()

const switchPage = (item) => {
  active.value = item;
  router.push(item)
  
};
</script>

<style></style>
