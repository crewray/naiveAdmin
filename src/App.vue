<script setup>
import { NDialogProvider, NMessageProvider } from "naive-ui";
import {provide,ref,readonly,reactive} from 'vue'
import router from '@/router/index.js'
const userStr=localStorage.getItem('userInfo')
const user=reactive(JSON.parse(userStr)?JSON.parse(userStr):{})
// let userId=ref(localStorage.getItem('userId'))
// const setUserId=(id)=>{
//   userId.value=id
//   localStorage.setItem('userId',id)
// }
const setUser=(userObj)=>{
  Object.assign(user,userObj)
  localStorage.setItem('userInfo',JSON.stringify(user))
}
// provide('userId',readonly(userId))
provide('user',readonly(user))
// provide('setUserId',setUserId)
provide('setUser',setUser)




// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <n-message-provider>
    <n-dialog-provider>
      <router-view></router-view>
    </n-dialog-provider>
  </n-message-provider>
</template>

<style>
@import "@/assets/css/reset.css";
@import "@/assets/css/common.css";
body{
  background: #f5f5f5;
}
.echart-container {
  width: 100%;
  height: 100%;
}
.box-card{
  box-sizing: border-box;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
