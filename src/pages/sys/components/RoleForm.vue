<template>
  <div class="form-dialog">
    <n-form>
      <n-form-item label="角色名称">
        <n-input
          v-model:value="role.name"
          placeholder="请输入角色名称"
        ></n-input>
      </n-form-item>
      <n-form-item label="描述">
        <n-input
          v-model:value="role.description"
          placeholder="请输入描述"
        ></n-input>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput, NSelect, NButton } from "naive-ui";
import { reactive } from "vue";
const props = defineProps({ row: {}, index: Number });
const { row, index } = props;
const role = reactive({ ...row });

defineExpose({role})
</script>

<style lang="less">
.n-dialog {
  width: 40% !important;
}
</style>
