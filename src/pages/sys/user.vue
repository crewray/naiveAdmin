<template>
  <div>
    <n-card class="box-card h100" title="用户数据">
      <n-button
        @click="addOrEditUser('添加用户')"
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
  useMessage,
} from "naive-ui";
import {
  getUserListApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  getRoleListApi,
} from "@/api/sys";
import UserForm from "./components/UserForm.vue";
import { EditRegular } from "@vicons/fa";
import {
  Edit16Regular,
  Delete16Regular,
  AddCircle16Regular,
} from "@vicons/fluent";
import md5 from "js-md5";
import { objectEntries } from "@antfu/utils";

// console.log(import.meta.env)

export default defineComponent({
  components: {
    NDataTable,
    NCard,
    NIcon,
    NButton,
    NDialogProvider,
    UserForm,
    Edit16Regular,
    Delete16Regular,
    AddCircle16Regular,
    NTag,
  },

  setup() {
    const message = useMessage();
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
      const res = await getUserListApi();
      // console.log(res);
      Object.assign(userList, res.data);
    };

    const dialog = useDialog();
    const user_form = ref();

    const addOrEditUser = (title, row, index) => {
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
          const user = user_form.value.user;

          if (row) {
            updateUserApi(user).then((res) => {
              if (res.status == 200) {
                userList[index] = user;
                message.success("修改成功");
              } else {
                message.error("修改失败");
              }
            });
            return;
          }

          user.id = userList.length ? userList[userList.length - 1].id + 1 : 1;
          user.password = md5(user.password);

          createUserApi(user).then((res) => {
            if (res.status == 201) {
              userList.push(user);
              message.success("添加成功");
            } else {
              message.error("添加失败");
            }
          });
        },
      });
    };

    const deleteUser = (row, index) => {
      dialog.success({
        title: "删除用户",
        content: "确定删除该用户吗？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: () => {
          deleteUserApi(row.id).then((res) => {
            if (res.status == 200) {
              userList.splice(index, 1);
              message.success("删除成功");
            } else {
              message.error("删除失败");
            }
          });
        },
      });
    };
    const roleList=reactive([]);
    const getRoleList = async () => {
      const res = await getRoleListApi();
      Object.assign(roleList, res.data);
    };
    const colorList=['success','warning','error','info']
    const column = [
      {
        title: "id",
        key: "id",
      },
      {
        title: "用户名",
        key: "username",
      },
      {
        title: "角色",
        key: "role",
        render: (row, index) => {
          return h(
            NTag,
            {
              type: colorList[row.role_id%4-1],
            },
            {
              default: () =>{
                const role=roleList.find(item=>item.id==row.role_id)
                return role?role.description:'未知'
              }
            }
          );
        },
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
                disabled: row.id == 1,
                onClick: () => {
                  addOrEditUser("编辑用户", row, index);
                },
              },
              { default: () => "编辑" }
            ),
            h(
              NButton,
              {
                size: "small",
                type: "error",
                disabled: row.id == 1,
                style: { marginLeft: "10px" },
                onClick: () => {
                  deleteUser(row, index);
                },
              },
              { default: () => "删除" }
            ),
          ];
        },
      },
    ];
    onMounted(()=>{
      getUser();
      getRoleList();
    })
    return {
      userList,
      column,
      pagination: paginationReactive,
      user_form,
      AddCircle16Regular,
      addOrEditUser,
    };
  },
});
</script>
