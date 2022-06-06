<template>
  <div class="login-wrap">
    <div class="login">
      <div class="titile tac f666 mt-15 mb-10 f20">
        excitingAdmin后台管理系统
      </div>
      <n-input :clearable="true" round placeholder="请输入用户名">
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
      <n-input
        class="mt-20"
        :clearable="true"
        type="password"
        show-password-on="mousedown"
        round
        placeholder="请输入密码"
      >
        <template #prefix>
          <n-icon :component="Lock" />
        </template>
      </n-input>
      <n-button type="primary" class="w100 mt-20">登录</n-button>
    </div>
  </div>
</template>

<script setup>
import { NInput, NIcon,NButton } from "naive-ui";
import { User, Lock } from "@vicons/fa";
</script>

<style lang="less">
body {
  background: url("@/assets/images/login-bg.jpg") no-repeat;
  background-size: cover;
}
.login-wrap {
  height: 100%;
  &::before {
    content: "";
    height: 50%;
    display: block;
  }
  .login {
    width: 400px;
    background-color: #fff;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-50%);
    border-radius: 10px;
    padding: 20px;
  }
}
</style>
