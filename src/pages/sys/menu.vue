<template>
  <div>
    <n-card class="h100" title="菜单管理">
      <n-data-table
        ref="table"
        :columns="columns"
        :data="menuList"
        :row-key="rowKey"
        :default-expanded-row-keys="['echart']"
      >
      </n-data-table>
    </n-card>
  </div>
</template>

<script setup>
import { menuList } from "@/data/menu.js";
import { h } from "vue";
import { NButton } from "naive-ui";
const columns = [
  {
    title: "key",
    key: "name",
  },
  {
    title: "名称",
    key: "title",
  },
  {
    title: "路径",
    key: "path",
  },
  {
    title:'页面',
    key:'component',
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
</script>

<style></style>
