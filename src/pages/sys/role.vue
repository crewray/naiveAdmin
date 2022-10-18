<template>
  <div>
    <n-card class="box-card h100" title="角色管理">
      <n-button
        @click="addOrEditRole('添加角色')"
        class="mb-10"
        size="small"
        type="info"
      >
        <template #icon>
          <n-icon color="#fff">
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
import {
  NDataTable,
  NCard,
  NButton,
  useDialog,
  useMessage,
  NIcon,
} from "naive-ui";
import { h, reactive, ref, onMounted } from "vue";
import RoleForm from "./components/RoleForm.vue";
import { getRoleListApi,createRoleApi,updateRoleApi,deleteRoleApi } from "@/api/sys.js";
import { AddCircle16Regular } from "@vicons/fluent";

const message = useMessage();

const dialog = useDialog();
const deleteRole = (id, index) => {
  dialog.success({
    title: "提示",
    content: "确定删除该角色吗？",
    positiveText:'确定',
    negativeText:'取消',
    onPositiveClick: () => {
      deleteRoleApi(id).then((res) => {
        if (res.status === 200) {
          message.success('删除成功');
          roleList.splice(index, 1);
        } else {
          message.error('删除失败');
        }
      });
    },
  });
};
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
        updateRoleApi(role).then((res) => {
          if(res.status==200){
            message.success("修改成功");
            roleList[index] = role;
          }else{
            message.error('修改失败');
          }
          
        });
        
        return;
      }
      role.id=roleList.length?roleList[roleList.length-1].id+1:1;
      createRoleApi(role).then((res) => {
        if(res.status==201){
          message.success("添加成功");
          roleList.push(role);
        }
        else{
          message.error('添加失败');
        }
      });
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
            disabled: row.id === 1,
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
            disabled: row.id === 1,
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
const getRoleList = () => {
  getRoleListApi()
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
};

onMounted(() => {
  getRoleList();
});

const pagination = {
  pageSize: 10,
};
</script>

<style></style>
