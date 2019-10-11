<template>
  <div class="mylogin" :style="note">

    <div style=" margin: 50px 100px 100px; padding:10px;" >
      <el-form  ref="form" :model="from" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="from.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="from.password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 45px">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import config from  '../../config'
  export default {
    name: "login",
    data() {
      return {
        from: {
          name: '',
          password: '',
        },
        /*设置背景图片*/
        note: {
          // backgroundImage:'url('+ require('../../mange/loginPng.jpg')+')',
        }
      }
    },
    methods: {
      onSubmit() {
        if (!this.from.name.trim() ||  !this.from.password.trim()){
          return this.$fail("用户名密码不能为空")
        }
        var names=this.from.name
        var passwords=this.from.password
        this.$post('/Login?name='+names+'&password='+passwords+'',{
          }
        ).then(res => {
          if (res.data.success == true) {
            sessionStorage.setItem(config.CACHE_KEY.LOGIN_USER_NAME,this.from.name)
            this.$get("/findByNamePermission?name="+this.from.name).then(res =>{
              if (res.data!=null){
                sessionStorage.setItem(config.CACHE_KEY.LOCCECT,res.data);
              }
            })
            this.$msg("登录成功")
            console.log(sessionStorage.getItem(config.CACHE_KEY.LOCCECT)+"ssssssssss")
            this.$go("/");
          } else {
          //  console.log(res.data)
            this.$fail(res.data.error)
          }
        })
        // this.$router.push("/");
      }
    }
  }
</script>
<style>
  .mylogin {
    position: absolute;
    border-radius: 5px;
    width: 600px;
    height: 300px;
    border: 5px #ccc solid;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -300px;
  }

  * {
    /*background: 	#7A7A7A;*/

  }
</style>
