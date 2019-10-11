<template>
<div>
  <el-button style="height: 40px"
             size="mini" type="primary" @click="showAdd"
  >添加
  </el-button>
  <el-table
    :data="RoleData"
    border
    style="width: 100%">
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleRemark"
      label="角色描述"
      width="180">
    </el-table-column>
    <el-table-column label="操作">

      <template slot-scope="scope">
        <el-button
          size="mini" type="primary"
        >编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"  >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align: right;margin-top: 20px">
    <el-pagination
      @size-change="getPageSize"
      @current-change="getCurrent"
      background
      :page-sizes="[5, 10, 20, 40]"
      layout="total,sizes,prev, pager, next,jumper"
      :total="total"
      :page-size="5"
    >
    </el-pagination>
  </div>
  <div>
    <el-dialog  :closeOnClickModal="false"  :title="(title==''||title==null||title==undefined?'添加角色':'修改角色')" :visible.sync="dialogFormVisible">
      <el-form  :model="Role" >
        <el-form-item label="角色名称">
          <el-input v-model="Role.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="Role.roleRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">提交</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
    export default {
      data() {
        return {
          RoleData:[],
          Role:{
            roleName:'',
            roleRemark:''
          },
          current:1,
          size:5,
          dialogFormVisible:false,
          title:'',
          total:null
        }
      },
      methods: {
        showAdd(){
          this.dialogFormVisible=true
        },
        addRole(){
          console.log(this.Role.roleName)
          console.log(this.Role.roleRemark)
          let  data ={"roleName":this.Role.roleName,"roleRemark":this.Role.roleRemark}
          console.log(data)
          this.$http.post("http://localhost:8762/role/add",data).then(res =>{
            if (res.data.success==true){
              this.$success('操作成功')
            } else {
              this.$fail('操作失败')
            }
            this.dialogFormVisible=false
            this.Role={
              roleName:'',roleRemark:''
            }
            this.findList()
          })
        },
        findList(){
          this.$http.get("http://localhost:8762/role/findAll",{params:
              {'current':this.current,'size':this.size}}).then(res =>{
            console.log(res.data)
          //  this.RoleData.push(res.data);
            this.RoleData=res.data.dataList
            this.total=res.data.totol
          })
        },
        getPageSize(paegSize) {
          this.size = paegSize;
          this.findList()
        },
        getCurrent(current) {
          this.current = current;
          this.findList()
        }
      },
      created(){
          this.findList()
      }
    }
</script>

<style scoped>

</style>
