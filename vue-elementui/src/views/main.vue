<template>
  <div id="app">
    <myheaders></myheaders>
    <section style="display: flex;flex: 1px;">
      <div style="min-width: 201px;background-color: rgb(84, 92, 100) ">
        <mylefts></mylefts>
      </div>
      <broad></broad>
      <!--<article style="flex: 1px;padding: 10px">-->
        <!--<el-breadcrumb separator="/" style="margin: 15px 0px">-->
          <!--<el-breadcrumb-item :to="{ path : '/'}">首页</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item><span v-text="menu1"></span></el-breadcrumb-item>-->
          <!--&lt;!&ndash;<el-breadcrumb-item><span v-text="menu2"></span></el-breadcrumb-item>&ndash;&gt;-->
        <!--</el-breadcrumb>-->
        <!--&lt;!&ndash;切换路由模式 自动切换页面&ndash;&gt;-->
        <!--<router-view></router-view>-->
      <!--</article>-->
    </section>
  </div>
</template>

<script>
  import {myheaders, mylefts,broad} from '@/components'

  export default {

    components: {
      mylefts,
      myheaders,
      broad
    }
  }
</script>

<style scoped>
</style>
