<template>
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <chartColumn id="c1" width="500px" height="300px"></chartColumn>
          </el-col>
          <el-col :span="8">
            <chartLine id="c2" width="500px" height="300px"></chartLine>
          </el-col>
          <el-col :span="8">
            <chartPie id="c3"  width="500px" height="300px"></chartPie>
          </el-col>
        </el-row>

      </div>
</template>

<script>
  import  { chartColumn,chartLine,chartPie } from '@/components'
    export default {
        components :{
          chartColumn,chartLine,chartPie
        }

    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
