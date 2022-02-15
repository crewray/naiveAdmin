<template>
  <n-breadcrumb class="bread" separator=">">
    <n-breadcrumb-item
      v-for="(item,index) in breadData"
      :key="item.path"
    >
    <template v-if="index !=breadData.length-1">
        <router-link :to="{path:item.path}">{{ item.meta.title }}</router-link>
    </template>
    <template v-else>{{item.meta.title}}</template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup>
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import router from "../../router";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
const route = useRoute();
const breadData = ref(route.matched);
console.log(breadData.value)
if (breadData.value[1].path == "/home") {
      //首页
      breadData.value = [{ path: "/home", meta: { title: "首页" } }];
    } else {
      breadData.value = [{ path: "/home", meta: { title: "首页" } }].concat(
        breadData.value
      );
    }
watch(
  () => route.matched,
  (newVal, oldVal) => {
      console.log(newVal)
    if (newVal[1].path == "/home") {
      //首页
      breadData.value = [{ path: "/home", meta: { title: "首页" } }];
    } else {
      breadData.value = [{ path: "/home", meta: { title: "首页" } }].concat(
        newVal
      );
    }
  }
);
</script>

<style lang="less">
.bread{
    
}
</style>
