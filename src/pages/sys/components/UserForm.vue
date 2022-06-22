<template>
  <div class="form-dialog">
    <n-form>
      <n-form-item label="用户名">
        <n-input
          v-model:value="user.username"
          placeholder="请输入用户名"
        ></n-input>
      </n-form-item>
      <n-form-item v-if="!row" label="密码">
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
          @focus="focus"
        ></n-select>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput, NSelect, NButton } from "naive-ui";
import { reactive, ref, onMounted } from "vue";
import { getRoleListApi } from "@/api/sys";

const props = defineProps({ row: {}, index: Number });
const { row, index } = props;
const user = reactive({ ...row });
const roleList = reactive([]);
const getRoleList = () => {
  getRoleListApi().then((res) => {
    if (res.status == 200) {
      const data=res.data.map(item=>{
        return {
          label:item.description,
          value:item.id
        }
      })
      roleList.splice(0,roleList.length,...data);
      // roleList.value=res.data
    }
  });
};
const focus = () => {
  console.log(roleList);
};
onMounted(getRoleList);
defineExpose({ user });
</script>

<style lang="less">
.n-dialog {
  width: 40% !important;
}
</style>
