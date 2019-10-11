<template>
    <div :id="id" :style="{width,height}">
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
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
              data:['销量']
            },
            xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
    }
</script>

<style scoped>

</style>
