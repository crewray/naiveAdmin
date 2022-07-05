<template>
  <div>
    <n-card class="h100">
      <n-data-table
        :columns="columns"
        :data="data"
        :row-key="rowKey"
        default-expand-all
      />
    </n-card>
  </div>
</template>

<script setup>
import { h } from "vue";
import {NButton} from 'naive-ui'
const data = [
  {
    name: "07akioni",
    index: "07",
    children: [
      {
        name: "08akioni",
        index: "08",
        children: [
          {
            name: "09akioni",
            index: "09",
          },
          {
            name: "10akioni",
            index: "10",
          },
        ],
      },
    ],
  },
  {
    name: "11akioni",
    index: "11",
  },
  
];
const columns = [
  {
    type: "selection",
  },
  {
    title: "name",
    key: "name",
  },
  {
    title: "index",
    key: "index",
  },
  {
    title: "操作",
    key: "action",
    render: (row, index) => {
      return [
        h(
          NButton,
          {
            type: "primary",
            onClick: () => {
              console.log(index);
            },
          },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          { type: "error", style: { marginLeft: "10px" } },
          { default: () => "删除" }
        ),
      ];
    },
  },
];
const rowKey = (row) => row.index;
</script>

<style></style>
