import  Vue from  'vue'

Vue.mixin({

  methods:{
    $msg(message,type="info"){
      this.$message({
        type,
        message
      })
    },
    $success(message){
      this.$msg(message,"success")
    },
    $fail(message){
      this.$msg(message,"error")
    }
  }

})
