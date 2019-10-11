import  Vue from  'vue'

Vue.mixin({

  methods:{
   $go(path){
     this.$router.push(path)
   }
  }
})
