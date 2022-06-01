<template>
<div>
  <n-card class="box-card" title="用户数据">
    <n-data-table
      ref="table"
      :columns="column"
      :data="userList"
      :pagination="pagination"
    />
  </n-card>
  
</div>
  
</template>

<script>
import { defineComponent, onMounted, reactive, ref, h, render } from "vue";
import { NDataTable, NCard, NButton, useDialog, NDialogProvider } from "naive-ui";
import { getUserList } from "/api/sys";
import  UserForm from "./components/UserForm.vue";

// console.log(import.meta.env)

export default defineComponent({
  components: { NDataTable, NCard,NButton,NDialogProvider },
  
  setup() {
    const paginationReactive = reactive({
      page: 1,
      pageSize: 5,
      showSizePicker: true,
      pageSizes: [3, 5, 7],
      onChange: (page) => {
        paginationReactive.page = page;
      },
      onUpdatePageSize: (pageSize) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
      },
    });
    // const userList = [{key:0,uid:1,account:"admin",password:"123456"}];
    const userList = ref([]);
    const getUser = async () => {
      const res = await getUserList();
      userList.value = res.data.data;
    };
    const dialog=useDialog();
    const editUser = (row, index) => {
      
      dialog.create({
        title: "编辑用户",
        content: ()=>h(UserForm,{row:row,index:index}),
        
        // onClose: async (data) => {
        //   if (data) {
        //     const res = await getUserList();
        //     userList.value = res.data.data;
        //   }
        // },
      });
    };
    const deleteUser = (id, index) => {
      userList.value.splice(index, 1);
    };
    const column = [
      {
        title: "Uid",
        key: "uid",
      },
      {
        title: "用户名",
        key: "username",
      },
      {
        title: "密码",
        key: "password",
      },
      {
        title: "角色",
        key: "role",
      },
      {
        title: "操作",
        key: "action",
        render: (row, index) => {
          return [
            h(
              NButton,
              {
                size: "small",
                type: "primary",
                onClick: () => {
                  editUser(row, index);
                },
              },
              { default: () => "编辑" }
            ),
            h(
              NButton,
              {
                size: "small",
                type: "warning",
                style: { marginLeft: "10px" },
                onClick: () => {
                  deleteUser(row.uid);
                },
              },
              { default: () => "删除" }
            ),
          ];
        },
      },
    ];
    onMounted(getUser);
    return {
      userList,
      column,
      pagination: paginationReactive,
    };
  },
});
</script>
