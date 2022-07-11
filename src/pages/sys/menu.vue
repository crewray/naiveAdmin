<template>
  <div>
    <n-card class="h100" title="菜单管理">
      <n-button @click="openForm()" class="mb-10" size="small" type="info"
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
        <template #header> 添加菜单 </template>
        <menuForm @on-save="save" @on-close="showModal = false" />
      </n-modal>
    </n-card>
  </div>
</template>

<script setup>
import { h, ref, onMounted, reactive } from "vue";
import { NButton, useDialog } from "naive-ui";
import menuForm from "./components/menuForm.vue";
import { createMenuApi, getMenuApi, getMenuItemApi, test } from "@/api/sys";
import { cloneDeep } from "lodash";
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
};

const reactiveData = reactive({
  menuList: [],
});

let menuList = [];

const getMenuList = async () => {
  // getMenuApi().then(res=>{
  //   if(res.status==200){
  //     reactiveData.menuList=res.data
  //   }
  // })
  const res = await getMenuApi();
  if (res.status == 200) {
    reactiveData.menuList = res.data;
    demenReduce(res.data, menuList);
    // console.log(menuList)
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
  // let data= await test({})
  // console.log(data)
  form.meta = {
    title: form.title,
  };
  let path = getPath(menuList, form.pid);
  let Item = {};
  let menuItemRes = await getMenuItemApi("/2?_embad=children/6");
  Item = menuItemRes.data;
  console.log(Item);
};
</script>

<style>
.n-dialog {
  width: 40% !important;
}
</style>
