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
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
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
