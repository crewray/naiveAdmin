<template>
  <div class="flex jc-sb aic pr-20">
    <n-breadcrumb class="bread pl-10 pt-10 pb-10" separator=">">
      <n-breadcrumb-item v-for="(item, index) in breadData" :key="item.path">
        <template
          v-if="
            index != breadData.length - 1 &&
            item.redirect != breadData[breadData.length - 1].path
          "
        >
          <router-link :to="{ path: item.path }">{{
            item.meta.title
          }}</router-link>
        </template>
        <template v-else>{{ item.meta.title }}</template>
      </n-breadcrumb-item>
    </n-breadcrumb>

    <n-popconfirm
      @positive-click="logout"
      v-if="userId"
      positive-text="确定"
      negative-text="取消"
    >
      <template #trigger>
        <n-button  size="small" type="info"
          >退出登录</n-button>
      </template>
      确定退出登录?
    </n-popconfirm>
  </div>
</template>

<script setup>
import { NBreadcrumb, NBreadcrumbItem, NButton, NPopconfirm } from "naive-ui";
import router from "../../router";
import { useRoute, useRouter } from "vue-router";
import { watch, ref, inject } from "vue";
const userId = inject("userId");
const setUserId = inject("setUserId");
const $router = useRouter();
const logout = () => {
  setUserId("");
  $router.push("/login");
};
const route = useRoute();
const breadData = ref(route.matched);
// console.log(breadData.value)
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
    console.log(newVal);
    if (newVal[1] && newVal[1].path == "/home") {
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
.bread {
}
</style>
