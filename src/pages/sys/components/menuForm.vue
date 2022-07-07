<template>
    <n-form>
      <n-form-item label="标志">
        <n-input placeholder="请输入标志"></n-input>
      </n-form-item>
      <n-form-item label="名称">
        <n-input placeholder="请输入名称"></n-input>
      </n-form-item>
      <n-form-item label="路由">
        <n-input placeholder="请输入路由"></n-input>
      </n-form-item>
      <n-form-item label="页面">
        <n-input placeholder="请输入页面"></n-input>
      </n-form-item>
      <n-form-item label="图标">
        <n-input placeholder="请输入图标"></n-input>
      </n-form-item>
      <n-form-item class="action">
        <n-button type="primary">保存</n-button>
        <n-button type="warning" class="ml-10">取消</n-button>
      </n-form-item>
    </n-form>
</template>

<script setup>

</script>

<style lang="less">
.action .n-form-item-blank{
  justify-content: flex-end;
}
</style>
