<template>
  <n-layout class="layout">
    <!-- <n-layout-header :inverted="true" class="header"> <Header></Header> </n-layout-header> -->

    <n-layout class="side-container" has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger
        :inverted="inverted"
        class="sidebar"
        :native-scrollbar="false"
      >
      <div class="flex  aic pointer  title" @click="router.push('/')">
        <img src="@/assets/logo.png" class="logo" alt="">
        NaiveAdmin</div>
        <SideBar/>
      </n-layout-sider>
      <n-layout class="bg-f4f4f4 right">
        <Breadcrumb/>
        <PageStackVue/>
        <router-view class="pl-10 pr-10 pt-10 pb-10 fg1" ></router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
<style lang="less">
html,body,#app{
  height: 100%;
}
.layout {
  width: 100%;
  height: 100%;
  .title{
    height: 42px;
    font-size: 16px;
    margin-left: 10%;
  }
  .logo{
    width: 30px;
    height: 25px;
    margin-right: 10px;

  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    height: 50px;
  }
  .side-container{
    height: 100%;

  }
  .right{
    .n-layout-scroll-container{
      display: flex;
      flex-direction: column;

    }
  }
  
}
</style>

<script>
import { defineComponent, provide,ref } from "vue";
import {
  NLayoutSider,
  NLayout,
  NLayoutHeader,
} from "naive-ui";

import Header from "../../components/Header.vue";
import SideBar from "./SideBar.vue";
import Breadcrumb from "./Breadcrumb.vue";
import PageStack from "./PageStack.vue";
import PageStackVue from "./PageStack.vue";
import {useRouter} from 'vue-router'






export default defineComponent({
  components: { NLayout, NLayoutSider, NLayoutHeader, Header, SideBar, Breadcrumb, PageStackVue },
  setup() {
    const router= useRouter()
    return {
      inverted: true,
      router
    };
  },
});
</script>

