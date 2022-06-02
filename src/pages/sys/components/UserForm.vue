<template>
  <div class="form-dialog">
    <n-form>
      <n-form-item label="用户名">
        <n-input
          v-model:value="user.username"
          placeholder="请输入用户名"
        ></n-input>
      </n-form-item>
      <n-form-item label="密码">
        <n-input
          v-model:value="user.password"
          type="password"
          placeholder="请输入密码"
        ></n-input>
      </n-form-item>
      <n-form-item label="角色">
        <n-select
          v-model:value="user.role_id"
          placeholder="请选择角色"
          :options="roleList"
        ></n-select>
      </n-form-item>
      
    </n-form>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput, NSelect, NButton } from "naive-ui";
import { reactive } from "vue";
const props = defineProps({ row: {}, index: Number });
const { row, index } = props;
const user = reactive({ ...row });
const roleList = [
  {
    label: "超级管理员",
    value: 1,
  },
  {
    label: "管理员",
    value: 2,
  },
  {
    label: "普通用户",
    value: 3,
  },
];
defineExpose({user})
</script>

<style lang="less">
.n-dialog {
  width: 40% !important;
}
</style>
