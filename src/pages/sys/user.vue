<template>
  <div class="">
    <n-card class="box-card" title="用户数据">
      <n-button @click="addOrEditUser('添加用户')" class="mb-10" size="small" type="info">
        <template #icon>
          <n-icon  color="#fff">
            <AddCircle16Regular></AddCircle16Regular>
          </n-icon>
        </template>
        添加
        </n-button>
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
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  h,
  render,
  readonly,
  getCurrentInstance,
} from "vue";
import {
  NDataTable,
  NCard,
  NButton,
  useDialog,
  NDialogProvider,
  NIcon,
  NTag,
} from "naive-ui";
import { getUserList } from "@/api/sys";
import UserForm from "./components/UserForm.vue";
import { EditRegular } from "@vicons/fa";
import {Edit16Regular,Delete16Regular,AddCircle16Regular} from "@vicons/fluent"

// console.log(import.meta.env)

export default defineComponent({
  components: { NDataTable, NCard,NIcon, NButton, NDialogProvider, UserForm,Edit16Regular,Delete16Regular,AddCircle16Regular,NTag },

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
    const userList = reactive([]);
    const getUser = async () => {
      const res = await getUserList();
      Object.assign(userList, res.data.data);
    };

    const dialog = useDialog();
    const user_form = ref();
    

    const addOrEditUser = (title,row, index) => {
      dialog.create({
        title,
        content: () =>
          h(UserForm, {
            ref: user_form,
            row,
            index,
          }),

        maskClosable: false,
        positiveText: "保存",
        negativeText: "取消",
        onPositiveClick: () => {
          const user=user_form.value.user
          if(row){
            userList[index] = user;
            return
          }
          user.uid=userList[userList.length-1].uid+1
          userList.push(user)
          
        },
      });
    };

    const deleteUser = (id, index) => {
      userList.splice(index, 1);
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
        title: "角色",
        key: "role",
        render:(row,index)=>{
          return h(NTag,{
            type:row.role_id==1?'info':row.role_id==2?'success':'default'
          },{
            default:()=>row.role_id==1?'超级管理员':row.role_id==2?'管理员':'普通用户'
          })
        }
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
                type: "info",
                
                onClick: () => {
                  addOrEditUser('编辑用户',row, index);
                },
              },
              { default: () => "编辑",
               }
            ),
            h(
              NButton,
              {
                size: "small",
                type: "error",
                
                style: { marginLeft: "10px" },
                onClick: () => {
                  deleteUser(row,index);
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
      user_form,
      AddCircle16Regular,
      addOrEditUser
    };
  },
});
</script>
