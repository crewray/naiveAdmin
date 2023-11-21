<template>
  <div>
    <n-card class="h100" title="菜单管理">
      <n-button
        :disabled="user.role_id != 1"
        @click="openForm(0)"
        class="mb-10"
        size="small"
        type="info"
        >添加菜单</n-button
      >
      <n-data-table
        ref="table"
        :columns="columns"
        :data="reactiveData.menuList"
        :row-key="rowKey"
        :default-expanded-row-keys="['echart']"
      >
      </n-data-table>
      <n-modal :mask-closable="false" preset="dialog" v-model:show="showModal">
        <template #header> {{ formTitle }} </template>
        <menuForm
          :form="curRow"
          :isEdit="isEdit"
          @on-save="save"
          @on-close="showModal = false"
        />
      </n-modal>
    </n-card>
  </div>
</template>

<script setup>
import { h, ref, onMounted, reactive, inject } from "vue";
import { NButton, useDialog, useMessage } from "naive-ui";
import menuForm from "./components/menuForm.vue";
import {
  createMenuApi,
  getMenuApi,
  getMenuItemApi,
  deleteMenuApi,
  updateMenuApi,
} from "@/api/sys";
import { cloneDeep } from "lodash";
import { toTree } from "../../utils/toTree";
import axios from "axios";
const columns = [
  {
    title: "标志",
    key: "name",
  },
  {
    title: "标题",
    key: "title",
  },
  {
    title: "路由",
    key: "path",
  },
  {
    title: "页面",
    key: "component",
  },
  {
    title: "操作",
    key: "action",
    render: (row, index) => {
      return [
        h(
          NButton,
          {
            type: "primary",
            onClick: () => {
              openForm(1, row);
            },
          },
          { default: () => "编辑" }
        ),
        h(
          NButton,
          {
            type: "error",
            style: { marginLeft: "10px" },
            onClick: () => {
              deleteMenu(row.id);
            },
          },
          { default: () => "删除" }
        ),
      ];
    },
  },
];
const rowKey = (row) => row.name;

const showModal = ref(false);
const message = useMessage();
const dialog = useDialog();
const curRow = ref({});
const isEdit = ref(0);
const formTitle = ref("");
const reload = inject("reload");
const user = inject("user");

const openForm = (is_edit, row) => {
  if (is_edit) {
    isEdit.value = 1;
    formTitle.value = "编辑菜单";
  } else {
    isEdit.value = 0;
    formTitle.value = "添加菜单";
    curRow.value = {};
  }
  if (row) {
    curRow.value = row;
  }
  showModal.value = true;
};

const reactiveData = reactive({
  menuList: [],
});

let menuList = [];

const getMenuList = async () => {
  const res = await getMenuApi();
  if (res.status == 200) {
    reactiveData.menuList = toTree(res.data);
  }
};

const demenReduce = (oldArr = [], newArr = []) => {
  oldArr.forEach((item) => {
    let temp = cloneDeep(item);
    if (temp.children) delete temp.children;
    newArr.push(temp);
    if (item.children) {
      demenReduce(item.children, newArr);
    }
  });
};

const getPath = (arr, pid) => {
  let path = "";
  const findPath = (arr = [], pid) => {
    if (pid === 0) return;
    for (const i in arr) {
      let item = arr[i];

      if (item.id === pid) {
        path = path ? `/${item.id}/children` + path : `/${item.id}`;
        findPath(arr, item.pid);
      }
    }
  };
  findPath(arr, pid);
  return path;
};

onMounted(() => {
  getMenuList();
});

const save = async (form) => {
  // console.log(form);
  form.meta = {
    title: form.title,
  };
  if (isEdit.value === 0) {
    form.component = "/src/pages" + form.path + ".vue";
    const res = await createMenuApi(form);

    // console.log(res);
    if (res.status >= 200 && res.status < 300) {
      const res2 = await axios.post("http://localhost:4000/addPage", {
        path: "/src/pages/" + form.path,
      });
      console.log(res2);
      if (res2.code == 200) {
        message.success("添加成功");
        showModal.value = false;
        // reload();
      } else {
        message.error("添加失败");
      }

      // getMenuList();
    } else {
      message.error("添加失败");
    }
  } else {
    const res = await updateMenuApi(form);
    if (res.status >= 200 && res.status < 300) {
      message.success("修改成功");
      showModal.value = false;
      // getMenuList();
      reload();
    } else {
      message.error("修改失败");
    }
  }
};
const deleteMenu = async (id) => {
  dialog.success({
    title: "提示",
    content: "确定删除该项吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      deleteMenuApi(id).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          message.success("删除成功");
          // getMenuList();
          reload();
        } else {
          message.error("删除失败");
        }
      });
    },
  });
};
</script>

<style>
.n-dialog {
  width: 40% !important;
}
</style>
