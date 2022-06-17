<template>
  <div class="tags mt-10 pl-10">
    <n-space>
      <!-- <n-tag closable @close="handleClose"> 爱在西元前 </n-tag>
      <n-tag type="success" closable @close="handleClose"> 不该 </n-tag>
      <n-tag type="warning" closable @close="handleClose"> 超人不会飞 </n-tag>
      <n-tag type="error" closable @close="handleClose"> 手写的从前 </n-tag>
      <n-tag type="info" closable @close="handleClose"> 哪里都是你 </n-tag> -->
      <n-tag
        :closable="item[0] === '首页' ? false : true"
        :type="item[1] === 1 ? 'success' : 'info'"
        @close="close(item[0])"
        v-for="item in pageStack"
        :key="item[0]"
        >{{ item[0] }}</n-tag
      >
    </n-space>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
const pageMap = new Map();
pageMap.set("首页", 0);
const pageStack = reactive(pageMap);

const route = useRoute();
watch(
  () => route.meta,
  (newVal, oldVal) => {
    let title = newVal.title;
    if (title) {
      pageStack.set(title, 1);
    }
    // console.log(oldVal,newVal)
    if (pageStack.has(oldVal.title)) {
      pageStack.set(oldVal.title, 0);
    }
    // console.log(pageStack)
  }
);

const close = (item) => {
  pageStack.delete(item);
};
</script>

<style></style>
