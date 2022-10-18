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
      <n-form-item label="权限">
        <n-tree
          block-line
          expand-on-click
          selectabble
          cascade
          checkable
          key-field="path"
          label-field="title"
          :data="reactiveData.menuList"
          :default-checked-keys="defaultCheckedKeys"
          @update:checked-keys="updateCheckedKeys"
        />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput, NSelect, NButton } from "naive-ui";
import { reactive,ref } from "vue";
import { menuList } from "@/data/menu.js";
import { toTree } from "../../../utils/toTree";
console.log(menuList)
const reactiveData=reactive({
  menuList:[]
})
reactiveData.menuList=toTree([...menuList.value])
const props = defineProps({ row: {}, index: Number });
const { row, index } = props;
// console.log(row)
const role = reactive({ ...row });
const defaultCheckedKeys = row ? row.access : [];
const updateCheckedKeys = (checkedKeys) => {
  role.access = checkedKeys;
  // console.log(checkedKeys);
};

defineExpose({ role });
</script>

<style lang="less">
.n-dialog {
  width: 40% !important;
}
</style>
