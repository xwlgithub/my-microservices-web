<template>
  <div :id="id" :style="{width,height}" >
  </div>
</template>

<script>
  import  echarts from  "echarts";
  /*created:html加载完成之前，执行。执行顺序：父组件-子组件
     mounted:html加载完成后执行。执行顺序：子组件-父组件
     methods：事件方法执行*/
  export default {
    props : ['width','height','id'],
    mounted (){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.id));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {},
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }


      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
</script>

<style scoped>

</style>
