<template>
  <div>
    <n-card class="box-card" title="用户数据">
      <n-data-table
        ref="table"
        :columns="columns"
        :data="roleList"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>

<script setup>
import { NDataTable, NCard } from "naive-ui";
const columns=[{title:'ID',key:'id'},{title:'角色名',key:'name'},{title:'描述',key:'description'}];
const roleList = [
  { id: 1, name: "超级管理员", status: 1, description: "超级管理员" },
  { id: 2, name: "管理员", status: 1, description: "管理员" },
  { id: 3, name: "普通用户", status: 1, description: "普通用户" },
];
const pagination={
  pageSize:10
}
</script>

<style></style>
