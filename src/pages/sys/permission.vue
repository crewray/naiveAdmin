<template>
  <div>
    <n-card class="h100" title="权限管理">
      <n-data-table ref="table" :columns="columns" :data="menuOptions" default-expand-all :row-key="rowKey">

      </n-data-table>
    </n-card>
  </div>
</template>

<script setup>
import {menuOptions} from '@/data/menu.js'
const columns=[
  {
    title:'key',
    key:'name'
  },
  {
    title:'名称',
    key:'title'
  },
  {
    title:'路径',
    key:'path'
  }
]
const rowKey=(row)=>row.path
</script>

<style>

</style>