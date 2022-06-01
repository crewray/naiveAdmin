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
        <SideBar/>
      </n-layout-sider>
      <n-layout>
        <Breadcrumb/>
        <router-view></router-view>
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
  
}
</style>

<script>
import { defineComponent } from "vue";
import {
  NLayoutSider,
  NLayout,
  NLayoutHeader,
} from "naive-ui";

import Header from "../../components/Header.vue";
import SideBar from "./SideBar.vue";
import Breadcrumb from "./Breadcrumb.vue";





export default defineComponent({
  components: { NLayout, NLayoutSider, NLayoutHeader, Header, SideBar,Breadcrumb },
  setup() {
    return {
      inverted: true,
    };
  },
});
</script>

