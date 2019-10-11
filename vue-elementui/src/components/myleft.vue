<template>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        >
  <!--启动路由模式-->
        <el-menu-item index="3" route="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" route="/user">用户列表</el-menu-item>
            <el-menu-item index="1-2" route="/role">角色管理</el-menu-item>
            <el-menu-item index="1-2" route="/permission">权限管理</el-menu-item>
            <!--<el-menu-item index="1-2">企业管理</el-menu-item>-->
            <!--<el-menu-item index="1-2">权限管理</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>基础数据</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" route="/datas">数据列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
</template>

<script>
    export default {
        name: "myleft"
    }
</script>

<style scoped>

</style>
