<template>
  <div>
    <n-form>
      <n-form-item label="用户名">
        <n-input     placeholder="请输入用户名"></n-input>
        
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput } from "naive-ui";
const props = defineProps({row:{},index:Number});
console.log(props)
const {row,index} = props;
const handleBlur = () => {
  console.log(row.username);
};


</script>

<style></style>
