<template>
  <div>
    <div class="bg-fff h100">
      <n-card class="home box-card h100">
        <!-- <img class="w100 h100" src="@/assets/images/welcome.png" alt="welcome"> -->
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { NCard } from "naive-ui";
</script>

<style scoped lang="less">
.home {
  background: url(@/assets/images/welcome.png) no-repeat center center;
  background-size: contain;
}
</style>
