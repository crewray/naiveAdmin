<template>
  <div>
    <n-card class="box-card" title="用户数据">
      <n-button @click="addOrEditUser('添加角色')" class="mb-10" size="small" type="info">
      <template #icon>
          <n-icon  color="#fff">
            <AddCircle16Regular></AddCircle16Regular>
          </n-icon>
        </template>
      添加
      </n-button>
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
import { NDataTable, NCard, NButton, useDialog, useMessage,NIcon } from "naive-ui";
import { h, reactive, ref } from "vue";
import RoleForm from "./components/RoleForm.vue";
import { getRoleList } from "@/api/sys.js";
import {AddCircle16Regular} from "@vicons/fluent"

const message = useMessage();
const deleteRole = (id, index) => {
  roleList.splice(index, 1);
  message.success("删除成功");
};
const dialog = useDialog();
const role_form = ref();
const addOrEditRole = (title, row, index) => {
  dialog.create({
    title,
    content: () =>
      h(RoleForm, {
        ref: role_form,
        row,
        index,
      }),

    maskClosable: false,
    positiveText: "保存",
    negativeText: "取消",
    onPositiveClick: () => {
      const role = role_form.value.role;
      if (row) {
        roleList[index] = role;
        message.success("修改成功");
        return;
      }
      role.uid = roleList[roleList.length - 1].uid + 1;
      roleList.push(role);
      message.success("添加成功");
    },
  });
};
const columns = [
  { title: "ID", key: "id" },
  { title: "角色名", key: "name" },
  { title: "描述", key: "description" },
  {
    title: "操作",
    key: "action",
    render: (row, index) => {
      return [
        h(
          NButton,
          {
            size: "small",
            type: "info",

            onClick: () => {
              addOrEditRole("编辑角色", row, index);
            },
          },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          {
            size: "small",
            type: "error",

            style: { marginLeft: "10px" },
            onClick: () => {
              deleteRole(row.id, index);
            },
          },
          { default: () => "删除" }
        ),
      ];
    },
  },
];
const roleList = reactive([
  // { id: 1, name: "超级管理员", status: 1, description: "超级管理员" },
  // { id: 2, name: "管理员", status: 1, description: "管理员" },
  // { id: 3, name: "普通用户", status: 1, description: "普通用户" },
]);
getRoleList()
  .then((res) => {
    if (res.status == 200) {
      Object.assign(roleList, res.data);
    } else {
      message.error("获取数据失败");
    }
  })
  .catch((err) => {
    console.log(err);
    message.error("获取数据失败");
  });
const pagination = {
  pageSize: 10,
};
</script>

<style></style>
