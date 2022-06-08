<template>
  <div class="flex bg-fff jc-sb aic pr-20 pl-10 pt-5 pb-5">
    <n-breadcrumb class="bread" separator=">">
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

    <n-popover
      placement="bottom-end"
      trigger="click"
    >
      <template #trigger>
        <div class="flex pointer aic">
          <img class="avatar" src="@/assets/images/avatar.gif" alt="" />
          <span class="ml-10 mr-5">{{ user.username }}</span>
          <n-icon size="18" :component="CaretDown"></n-icon>
        </div>
      </template>
      <span class="pointer" @click="logout">退出登录</span>
    </n-popover>

    <!-- <div class="logout" v-show="showLogout">
        <n-popconfirm
        @positive-click="logout"
        
        positive-text="确定"
        negative-text="取消"
      >
        <template #trigger>
          <n-button size="small" type="info">退出登录</n-button>
        </template>
        确定退出登录?
      </n-popconfirm>
      </div> -->
  </div>
</template>

<script setup>
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NPopconfirm,
  NIcon,
  NDropdown,
  NPopover,
} from "naive-ui";
import { CaretDown } from "@vicons/fa";
import router from "../../router";
import { useRoute, useRouter } from "vue-router";
import { watch, ref, inject } from "vue";
// let showLogout = ref(false);
const options = [
  {
    label: "退出登录",
    onClick: () => {
      logout();
    },
    key: "logout",
  },
];
const handleSelect = (key, option) => {
  option.onClick();
};
const userId = inject("userId");
const setUserId = inject("setUserId");
const user = inject("user");
const setUser = inject("setUser");
const $router = useRouter();
const logout = () => {
  // setUserId("");
  setUser({});
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
    // console.log(newVal);
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
.avatar {
  width: 40px;
  height: 40px;
}
</style>
