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
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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
