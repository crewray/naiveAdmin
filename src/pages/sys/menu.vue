<template>
  <div>
    <n-card class="h100" title="菜单管理">
      <n-button @click="openForm()" class="mb-10" size="small" type="info"
        >添加菜单</n-button
      >
      <n-data-table
        ref="table"
        :columns="columns"
        :data="menuList"
        :row-key="rowKey"
        :default-expanded-row-keys="['echart']"
      >
      </n-data-table>
      <n-modal preset="dialog" v-model:show="showModal">
        <template #header>
            添加菜单
        </template>
        <menuForm />
      </n-modal>
    </n-card>
  </div>
</template>

<script setup>
import { menuList } from "@/data/menu.js";
import { h, ref } from "vue";
import { NButton, useDialog } from "naive-ui";
import menuForm from "./components/menuForm.vue";
const columns = [
  {
    title: "标志",
    key: "name",
  },
  {
    title: "名称",
    key: "title",
  },
  {
    title: "路由",
    key: "path",
  },
  {
    title: "页面",
    key: "component",
  },
  {
    title: "操作",
    key: "action",
    render: (row, index) => {
      return [
        h(NButton, { type: "primary" }, { default: () => "编辑" }),
        h(
          NButton,
          { type: "error", style: { marginLeft: "10px" } },
          { default: () => "删除" }
        ),
      ];
    },
  },
];
const rowKey = (row) => row.name;

const showModal = ref(false);
const openForm = () => {
  showModal.value = true;
};
</script>

<style>
.n-dialog {
  width: 40% !important;
}
</style>
