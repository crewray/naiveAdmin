<template>
  <div class="login-wrap">
    <div class="login">
      <div class="titile tac f666 mt-15 mb-10 f20">
        excitingAdmin后台管理系统
      </div>
      <n-input v-model:value="username" :clearable="true" round placeholder="请输入用户名">
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
        @keyup.enter="login"
      >
        <template #prefix>
          <n-icon :component="Lock" />
        </template>
      </n-input>
      <n-button type="primary" @click="login" class="w100 mt-20">登录</n-button>
    </div>
  </div>
</template>

<script setup>
import { NInput, NIcon,NButton,useMessage } from "naive-ui";
import { User, Lock } from "@vicons/fa";
import {inject,ref,onMounted} from 'vue';
import {useRouter} from 'vue-router'
import {getUserList} from '@/api/sys.js'

let userList = []
const getUsers= async ()=>{
  const res=await getUserList()
  if(res.data.status==200){
    userList= res.data.data
  }
  

}
onMounted(getUsers)


let username=ref('admin')
let password=ref('123456')

let userId=inject('userId')
const setUserId=inject('setUserId')
const router=useRouter()

const message=useMessage()
const login=()=>{
  if(!username.value){
    message.error('请输入用户名')
    return
  }
  if(!password.value){
    message.error('请输入密码')
    return
  }
  for(let i=0;i<userList.length;i++){
    if(userList[i].username==username.value&&userList[i].password==password.value){
      setUserId(userList[i].uid)
      router.push('/')
      message.success('登录成功')
      return
    }
  }
  message.error('用户名或密码错误')
}

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
