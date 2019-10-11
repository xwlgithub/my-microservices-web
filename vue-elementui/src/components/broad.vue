<template>
  <article style="flex: 1px;padding: 10px">
    <el-breadcrumb separator="/" style="margin: 10px 0px">
      <!--<el-breadcrumb-item :to="{ path : '/'}">首页</el-breadcrumb-item>-->
      <el-breadcrumb-item
        v-for=" item in MenuList" :key="item.meta.title" :to="item.path">
        <span style="cursor: pointer;font-weight: normal;" v-text="item.meta.title"></span></el-breadcrumb-item>
    </el-breadcrumb>
    <!--切换路由模式 自动切换页面-->
    <router-view></router-view>
  </article>
</template>

<script>
    export default {
      name: "broda",
      watch: {
        $route(val) {
        //  console.log(this.Titles.hasOwnProperty("1"))
          console.log(val)
          /*面包屑 自动增长*/
           console.log(this.Titles.indexOf(val.meta.title))
               if (this.Titles.indexOf(val.meta.title)>=0){
                 console.log("包含了")
                 return
               } else {
                 this.MenuList.push(val)
                 this.Titles.push(val.meta.title)
            }
        }
      },
      data(){
        return {
          menu1: '',
          MenuList:[],
          Titles:[]
        }
      }
    }
</script>

<style scoped>

</style>
