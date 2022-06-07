<template>
  <div class="login-wrap">
    <div class="login">
      <div class="titile tac f666 mt-15 mb-10 f20">
        excitingAdmin后台管理系统
      </div>
      <n-input
        v-model:value="username"
        :clearable="true"
        round
        placeholder="请输入用户名"
      >
        <template #prefix>
          <n-icon :component="User" />
        </template>
      </n-input>
      <n-input
        v-model:value="password"
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
      <div class="flex mt-20 jc-sb aic">
        <div>
          <n-input
            v-model:value="img_code"
            placeholder="请输入验证码"
            @keyup.enter="login"
            :clearable="true"
            round
          >
            <template #prefix>
              <n-icon :component="CheckCircleRegular" />
            </template>
          </n-input>
        </div>

        <Verify
          :contentHeight="35"
          :change="data.change_img_code"
          @click="changeImageCode"
          @getCode="backImageCode"
        ></Verify>
      </div>

      <n-button type="primary" @click="login" class="w100 mt-20">登录</n-button>
    </div>
  </div>
</template>

<script setup>
import { NInput, NIcon, NButton, useMessage } from "naive-ui";
import { User, Lock, CheckCircleRegular } from "@vicons/fa";
import { inject, ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { getUserList } from "@/api/sys.js";
import Verify from "@/components/Verify.vue";
import md5 from "js-md5";

const data = reactive({
  change_img_code: false, // 刷新验证码
  img_code: "", // 加密后的验证码值
});

// 刷新验证码操作
const changeImageCode = () => {
  data.change_img_code = !data.change_img_code;
};

// 接收组件返回加密后的验证码值
const backImageCode = (code) => {
  data.img_code = code;
  // console.log("data", data.img_code);
};

let userList = [];
const getUsers = async () => {
  const res = await getUserList();
  if (res.data.status == 200) {
    userList = res.data.data;
  }
};
onMounted(getUsers);

let username = ref("admin");
let password = ref("123456");
let img_code = ref("");

let userId = inject("userId");
const setUserId = inject("setUserId");
const router = useRouter();

const message = useMessage();
const login = () => {
  if (!username.value) {
    message.error("请输入用户名");
    return;
  }
  if (!password.value) {
    message.error("请输入密码");
    return;
  }
  if (!img_code.value) {
    message.error("请输入验证码");
    return;
  }
  const user = userList.find((item) => {
    return item.username == username.value;
  });
  if (!user) {
    message.error("用户名不存在");
    return;
  }
  if (user.password != password.value) {
    message.error("密码错误");
    return;
  }
  // console.log(md5(img_code.value));
  if (md5(img_code.value) !== data.img_code) {
    message.error("验证码错误");
    changeImageCode();
    return;
  }
  setUserId(user.uid);
  router.push("/");
  message.success("登录成功");

  // for (let i = 0; i < userList.length; i++) {
  //   if (
  //     userList[i].username == username.value &&
  //     userList[i].password == password.value &&
  //     data.img_code == img_code.value
  //   ) {
  //     setUserId(userList[i].uid);
  //     router.push("/");
  //     message.success("登录成功");
  //     return;
  //   }
  // }
};
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
