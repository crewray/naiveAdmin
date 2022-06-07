<template>
<div class="pt-20 pl-10 pr-10">
    <n-card >
    <n-result size="huge" status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button>找点乐子吧</n-button>
    </template>
  </n-result>
</n-card>
</div>

  
</template>
<script setup>
import { NResult,NButton,NCard } from "naive-ui";
</script>