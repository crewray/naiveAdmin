<template>
  <div >
    <n-row class="tac">
    <n-col :span="12">
      <n-statistic label="统计数据" :value="99">
        <template #prefix>
          <n-icon>
            <md-save />
          </n-icon>
        </template>
        <template #suffix>
          / 100
        </template>
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="活跃用户">
        1,234,123
      </n-statistic>
    </n-col>
  </n-row>
  <n-row class="pl-10 pr-10">
    <n-card>
      <div id="main" ></div>
    </n-card>
  </n-row>
    
    
  </div>
</template>

<script>
import * as echarts from "echarts";
import { MdSave } from "@vicons/ionicons4";
import { NIcon, NCard,NRow,NCol,NStatistic} from "naive-ui";
export default {
  components:{
    MdSave,NIcon,NRow,NCol,NCard,NStatistic
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      // 获取节点
      var chartDom = document.getElementById("main");
      // 初始化echarts
      var myChart = echarts.init(chartDom);
      // 图标选项设置
      var option = {
        // 标题
        title: {
          text: "本周销量",
          x: "center",
        },
        // 横轴
        xAxis: {
          type: "category",
          // 横轴数据
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        // 纵轴
        yAxis: {
          type: "value",
        },
        series: [
          {
            // 纵轴数据
            data: [120, 200, 150, 80, 70, 110, 130],
            // 类型为柱状
            type: "bar",
            // 显示背景颜色
            showBackground: true,
            // 背景颜色
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      // 把选项放入echart对象
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
#main {
  width: 100%;
  height: 600px;
  margin: auto;
}
</style>