<template>
  <div>
    <div style="margin-bottom: 2px">
      <el-button style="height: 40px"
                 size="mini" type="primary" @click="showAdd"
      >添加
      </el-button>
      <el-input style="width: 200px;margin-left: 20px" placeholder="姓名检索" v-model="input3" class="input-with-select">
      </el-input>
      <el-button slot="append" @click="selectByName" icon="el-icon-search"></el-button>
    </div>
    <el-table border
              :data="tableData"
              style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱地址">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="电话号码">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="pleaseRole(scope.row.id)" type="success"
          >分配角色
          </el-button>
          <el-button
            size="mini" @click="showAndUpdate(scope.row.id)" type="primary" v-has="updates"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger" @click="deleteById(scope.row.id)" v-has="deletes">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
    <!--分配角色-->
    <div>
      <el-drawer
        title="分配角色"
        :visible.sync="drawer"
        :direction='direction'
        :before-close='handleClose'
      >
        <el-checkbox-group
          v-model="dept,showisHaveRole" >
          <el-checkbox   :border="true" v-for="(de,index) in roles " :key="index" :label="de.id">{{de.roleName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-drawer>
    </div>
    <!--添加
      @open="$refs.frm.clearValidate()"
    -->
    <div>
      <el-dialog :closeOnClickModal="false" :title="(title==''||title==null||title==undefined?'添加用户':'修改用户')"
                 :visible.sync="dialogFormVisible">
        <el-form :model="User" :rules="rules" ref="User">
          <el-form-item label="姓名">
            <el-input v-model="User.name" autocomplete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="密码">-->
          <!--<el-input v-model="User.password" autocomplete="off" type="password"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item
            label="邮箱" prop="email">
            <el-input v-model="User.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber"
          >
            <el-input v-model="User.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddUser">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import config from '../../config'

  export default {
    name: "userList",
    data() {
      return {
        showisHaveRole: [],
        dept: [],
        roles: [],
        direction: 'ttb',
        tableData: [],
        total: null,
        size: 5,
        current: 1,
        dialogFormVisible: false,
        User: {
          id: '',
          name: '',
          password: '',
          email: '',
          phoneNumber: ''
        },
        rules: {
          phoneNumber:
            [{required: true, message: '电话号码不能为空'},
              {pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '手机号格式错误'}],
          email: [{pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/, message: "请输入正确的邮箱"}],
          name: [{required: true, message: "姓名不能为空"}]
        },
        de: '',
        title: '',
        input3: '',
        updates: "",
        deletes: "",
        drawer: false,
        userId: '',
        oldRoles:[],
        deRoles:[]
      }
    },
    methods: {
      // 分配角色
      pleaseRole(id) {
        //打开之前调用角色列表
        this.$http.get("http://localhost:8762/role/findAll",).then(res => {
          this.roles = res.data.dataList
        })
        this.userId = id
        this.$http.get("http://localhost:8762/role/findRolesByUserId?userId=" + this.userId).then(res => {
         if (res.data.isStatus){
           this.showisHaveRole=res.data.lists
           //存储原先角色ID组
           this.oldRoles=this.showisHaveRole
           console.log(this.showisHaveRole+"数据")
           this.$success("操作成功")
         } else {
           this.$fail(res.data.message)
         }
        })
        this.drawer = true
      },
      //抽屉关闭之后调用
      handleClose() {
        console.log(this.dept)
        console.log(this.userId + "用户id" + this.showisHaveRole + "角色id")
        this.$confirm('确认提交?')
          .then(_ => {
            let old= this.oldRoles;
            var index =0;
            for (let i = 0; i < old.length; i++) {
             const  roleID=old[i]
              //倘若 不包含 赋值新数组-后端删除
              console.log(this.showisHaveRole.indexOf(roleID))
              if (this.showisHaveRole.indexOf(roleID)==-1){
                this.deRoles[index]=roleID;
                index++
              }
            }
            console.log(this.deRoles+"要删除的数据")
            this.$http.post("http://localhost:8762/user/saveWithRole?" +
              "userId=" + this.userId + "&roleIds=" + this.showisHaveRole+
              "&deleIds="+this.deRoles)
              .then(res => {
                if (res.data.success == true) {
                  this.$success("操作成功")
                } else {
                  this.$fail("操作失败")
                }
              })
            this.drawer = false
            // 清空角色选中缓存
            this.dept = []
            this.getList()
          })
          .catch(_ => {
            this.drawer = false
            this.dept = []
          });
      },
      //根据姓名检索
      selectByName() {
        // console.log(this.input3)
        this.getList()
      },
      /*查询列表*/
      getList() {
        this.$http.get('/findAll', {
            params: {
              'current': this.current,
              'size': this.size,
              'name': this.input3
            }
          }
        ).then(res => {
          //  this.tableData.push(res.data)
          this.tableData.push(res.data)
          this.tableData = this.tableData[0].dataList;
          //总条数
          this.total = res.data.totol;
          if (this.tableData == null) {
            this.tableData = res.data.dataList
          }
        })
      },
      deleteById(id) {
        /*直接带参数 {} */
        this.$http.delete('/deletes/' + id,
        ).then(res => {
          //  console.log(res.data)
          if (res.data.success == true) {
            this.$message('删除成功')
            this.getList()
          } else {
            this.$message.error('删除失败')
          }
        })
      },
      AddUser() {

        if (!this.User.name.trim() || !this.User.email.trim() || !this.User.phoneNumber.trim()) {
          this.$fail("请完善信息");
          return
        }
        if (this.User.name.length > 10) {
          this.$fail("姓名不能超过10位")
          return
        }
        // 查看表单中是否依然存在错误提示信息
        this.$refs["User"].validate((valid) => {
          if (!valid) {
            this.$fail("请验证输入信息是否有误!")
            return
          } else {
            this.$http.post(
              '/save', {
                userJson: this.User
              }).then(res => {
              if (res.data.success == true) {
                this.$success('操作成功')
                this.getList()
              } else {
                this.$fail('操作失败')
              }
              this.dialogFormVisible = false
            })
          }
        })
      },
      getPageSize(paegSize) {
        this.size = paegSize;
        this.getList()
      },
      getCurrent(current) {
        this.current = current;
        this.getList()
      },
      //打开添加弹框
      /*id为空  添加用户 /修改用户 显示 提示文字*/
      showAdd() {
        // 清除表单验证问题
        if (this.$refs["User"] !== undefined) {
          this.$refs["User"].resetFields();
        }
        // this.$nextTick(() => {
        //   this.$refs["User"].resetFields();       // this.$refs.adduserform.resetFields();
        // });
        this.User = {
          id: '',
          name: '',
          password: '',
          email: '',
          phoneNumber: ''
        }
        this.dialogFormVisible = true
        this.title = ''
      },
      /*根据id查询*/
      showAndUpdate(id) {
        if (this.$refs["User"] !== undefined) {
          this.$refs["User"].resetFields();
        }
        this.$http.get(
          "/selectAll/" + id
        ).then(res => {
          this.User = res.data
          this.title = 'update'
          this.dialogFormVisible = true
        })
      }
    },
    created() {
      this.getList()
      //  this.updates=sessionStorage.getItem(config.CACHE_KEY.LOCCECT)
      console.log("进入页面之后" + sessionStorage.getItem(config.CACHE_KEY.LOCCECT))
    }
  }

</script>

<style scoped>

</style>
