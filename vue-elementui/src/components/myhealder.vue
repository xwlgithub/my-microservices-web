<template>
  <div style="display: flex;align-items: center;justify-content: space-between;background-color: rgb(84, 92, 100);">
    <div style="color: deepskyblue;font-size: 18px;margin-left: 10px;">主页</div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item  index="1">文档说明</el-menu-item>
      <el-submenu   index="2">
        <template  slot="title"><span>{{username}}</span></template>
        <el-menu-item  index="2-1">个人信息</el-menu-item>
        <el-menu-item  index="2-2">修改密码</el-menu-item>
        <el-menu-item  index="2-3" @click="Logout">退出</el-menu-item>
      </el-submenu>
      <!--<el-menu-item  index="4"><a href="https://www.ele.me" target="_blank">
     订单管理</a></el-menu-item>-->
    </el-menu></div>
</template>

<script>
  import  config from  '@/config'
    export default {
        name: "myhealder"
      ,
      data(){
        return {
          username:sessionStorage.getItem(config.CACHE_KEY.LOGIN_USER_NAME)
        }
      },
      methods:{
        Logout(){
          this.$go("/Login");
          sessionStorage.clear();
        }
      }
    }
</script>

<style scoped>

</style>
