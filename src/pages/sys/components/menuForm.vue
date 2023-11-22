<template>
  <n-form>
    <n-form-item label="标志">
      <n-input v-model:value="form.name" placeholder="请输入标志"></n-input>
    </n-form-item>
    <n-form-item label="标题">
      <n-input v-model:value="form.title" placeholder="请输入标题"></n-input>
    </n-form-item>
    <n-form-item label="父级">
      <n-tree-select
        v-model:value="form.pid"
        :options="reactiveData.menuList"
        label-field="title"
        key-field="id"
        placeholder="请选择父级"
        :on-update:value="changePid"
      />
    </n-form-item>
    <n-form-item label="路由">
      <n-input :disabled="props.isEdit?true:false" v-model:value="form.path" placeholder="请输入路由"></n-input>
    </n-form-item>
    <!-- <n-form-item label="页面">
      <n-input
        v-model:value="form.component"
        placeholder="请输入页面"
      ></n-input>
    </n-form-item> -->
    <n-form-item label="图标">
      <n-popover :show="showPopover" trigger="manual">
        <template #trigger>
          <n-input
            @click="showPopover = !showPopover"
            v-model:value="form.icon"
            :readonly="true"
            placeholder="请输入图标"
          >
            <template #suffix>
              <n-icon :component="AngleRight"></n-icon>
            </template>
          </n-input>
        </template>
        <div>
          <div class="flex jc-sb mb-10">
            <div><span>选择图标</span></div>

            <n-icon
              class="pointer"
              size="18"
              @click="showPopover = false"
              :component="WindowCloseRegular"
            ></n-icon>
          </div>
          <IconSelect @on-select="onSelect"></IconSelect>
        </div>
      </n-popover>
    </n-form-item>
    <n-form-item class="action">
      <n-button @click="save" type="primary">保存</n-button>
      <n-button @click="close" type="warning" class="ml-10">取消</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import IconSelect from "./IconSelect.vue";
import { AngleRight, WindowCloseRegular } from "@vicons/fa";
import { reactive, ref } from "vue";
import {menuList} from "@/data/menu.js";
import { toTree } from "../../../utils/toTree";
import { cloneDeep } from "lodash";

const props=defineProps({form:{},isEdit:{type:Boolean,default:false}})

const reactiveData=reactive({
  menuList:[]
})
const tmp=cloneDeep(menuList.value)
reactiveData.menuList=toTree(tmp)

console.log(reactiveData.menuList)

const form = reactive({
  icon: "",
  name: "",
  title: "",
  path: "",
  component: "",
  pid: 0,
});

Object.assign(form,props.form)

const showPopover = ref(false);

const onSelect = function (name) {
  // console.log(name)
  form.icon = name;
  showPopover.value = false;
};

const emit = defineEmits(["onSave", "onClose"]);

const save = function () {
  emit("onSave", form);
};

const close = function () {
  emit("onClose");
};

const changePid = function (pid) {
  form.pid = pid;
  
};
</script>

<style lang="less">
.action .n-form-item-blank {
  justify-content: flex-end;
}
</style>
