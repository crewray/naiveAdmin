<template>
  <div>
    <n-card class="box-card h100"> 
        <div class="echart-container" id="main"></div>
    </n-card>
  </div>
</template>

<script setup>
import { NCard } from "naive-ui";
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount } from "vue";
onMounted(draw);

let myChart = null;

function draw() {
  // 获取节点
  var chartDom = document.getElementById("main");
  // 初始化echarts
  myChart = echarts.init(chartDom);
  // 图标选项设置
  var option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

  // 把选项放入echart对象
  myChart.setOption(option);
}
onBeforeUnmount(() => {
  myChart.dispose();
});

</script>

<style></style>
