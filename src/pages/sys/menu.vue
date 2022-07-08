<template>
  <div>
    <n-card class="h100" title="菜单管理">
      <n-button @click="openForm()" class="mb-10" size="small" type="info"
        >添加菜单</n-button
      >
      <n-data-table
        ref="table"
        :columns="columns"
        :data="menuList"
        :row-key="rowKey"
        :default-expanded-row-keys="['echart']"
      >
      </n-data-table>
      <n-modal preset="dialog" v-model:show="showModal">
        <template #header> 添加菜单 </template>
        <menuForm @on-save="save" @on-close="showModal = false" />
      </n-modal>
    </n-card>
  </div>
</template>

<script setup>
import { menuList } from "@/data/menu.js";
import { h, ref, onMounted } from "vue";
import { NButton, useDialog } from "naive-ui";
import menuForm from "./components/menuForm.vue";
import { createMenuApi, getMenuApi } from "@/api/sys";
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
        h(NButton, { type: "primary" }, { default: () => "编辑" }),
        h(
          NButton,
          { type: "error", style: { marginLeft: "10px" } },
          { default: () => "删除" }
        ),
      ];
    },
  },
];
const rowKey = (row) => row.name;

const showModal = ref(false);
const openForm = () => {
  showModal.value = true;
  getPath();
};

const reactiveData = {
  menuList: [],
};

const getMenuList = async () => {
  // getMenuApi().then(res=>{
  //   if(res.status==200){
  //     reactiveData.menuList=res.data
  //   }
  // })
  const res = await getMenuApi();
  if (res.status == 200) {
    return res.data;
  }
};

const getPath = (arr,pid) => {
  let pathArr = [];
  let layer = 0;

  const traverse = (arr = [], pid) => {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.id === pid) {
        pathArr[layer]=item.id
        return;
      }

      if (item.children) {
        pathArr[layer]=item.id
        layer+=1
        traverse(item.children, pid);
      }
    }
  };
  traverse(arr,pid)
  console.log(pathArr)
};

const save = (form) => {
  form.meta = {
    title: form.title,
  };
  getPath(menuList, form.pid);

  // createMenuApi(form).then((res) => {
  //   if (res.status === 200) {
  //     message.success('添加成功');
  //     showModal.value = false;
  //   } else {
  //     message.error('添加失败');
  //   }
  // });
};
</script>

<style>
.n-dialog {
  width: 40% !important;
}
</style>
